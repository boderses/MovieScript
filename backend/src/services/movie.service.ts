import { Service } from "typedi";
import { GridFSBucket } from "mongodb";
import { gfs } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import mongoose, { Types } from "mongoose";
import { PassThrough } from "stream";
import MovieModel from "../models/movie.model";
import { MovieUserInput, Movie, MoviesQuery, MovieUpdate, User } from "../types";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST;

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async uploadFileToGridFS(file: { buffer: Buffer; originalname: string }, userId: Types.ObjectId) {
    const dirName = uuidv4();

    if (!gfs) {
      throw new Error("GridFSBucket not initialized");
    }

    const writeStream = gfs.openUploadStream(file.originalname, {
      metadata: { userId, dirName },
    });

    const bufferStream = new PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(writeStream);

    const fileUrl = `${HOST}/public/movies/${userId}/${dirName}/${file.originalname}`;

    return { fileUrl, id: dirName };
  }

  async createMovie(data: MovieUserInput, user: User) {
    return await this.movieModel.createMovie({ ...data, userId: user._id });
  }

  async getAllNotDeletedMovies(userId: Types.ObjectId) {
    return await this.movieModel.model.find({
      deleted: { $ne: true },
      userId,
    });
  }

  async getMovieList(query: MoviesQuery, user: User) {
    const allMovies = await this.getAllNotDeletedMovies(user._id);

    const limit = Math.min(Number(query.limit) || 8, 8);

    const moviesModel = this.movieModel.model
      .find({ deleted: { $ne: true }, userId: user._id })
      .limit(limit);

    if (query.search) {
      moviesModel.find({ title: { $regex: query.search, $options: "i" } });
    }

    if (query.categories) {
      const categories = query.categories.split(",");
      moviesModel.find({ "categories.name": { $in: categories } });
    }

    if (query.sort) {
      moviesModel.sort({ title: query.sort });
    }

    const movies = await moviesModel;

    return { movies, allMoviesCount: allMovies.length };
  }

  async getMovie(id: string, userId: Types.ObjectId) {
    const movie = await this.movieModel.getMovie(id, userId);

    if (!movie || movie.deleted) {
      throw new Error("Invalid id");
    }

    return movie;
  }

  async updateMovie(data: { movie: Partial<MovieUpdate>; id: string; userId: Types.ObjectId }) {
    return await this.movieModel.updateMovie(data);
  }

  async deleteMovieImage(id: string, userId: Types.ObjectId) {
    if (gfs) {
      await gfs.delete(new mongoose.Types.ObjectId(id));
    } else {
      throw new Error("No file found");
    }
  }

  async deleteMovie(id: string, userId: Types.ObjectId) {
    await this.deleteMovieImage(id, userId);
    return await this.movieModel.deleteMovie(id, userId);
  }

  async updateMovieImage(data: { file: { buffer: Buffer; originalname: string }; id: string; userId: Types.ObjectId }) {
    await this.deleteMovieImage(data.id, data.userId);
    return await this.uploadFileToGridFS(data.file, data.userId);
  }

  async createMovieImage(file: { buffer: Buffer; originalname: string }, userId: Types.ObjectId) {
    return await this.uploadFileToGridFS(file, userId);
  }
}

export default MovieService;
