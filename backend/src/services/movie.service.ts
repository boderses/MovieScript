import mongoose, { Types, Document } from "mongoose";
import dotenv from "dotenv";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { GridFSBucket, GridFSFile } from "mongodb";
import MovieModel from "../models/movie.model";
import { MovieUserInput, Movie, MoviesQuery, MovieUpdate, User } from "../types";
import { gfs } from "../config/db";
import { PassThrough } from "stream";

dotenv.config();

const HOST = process.env.HOST;

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async uploadFileToGridFS(file: Express.Multer.File, userId: Types.ObjectId) {
    const dirName = uuidv4();

    if (!gfs) {
      throw new Error('GridFSBucket not initialized');
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

  async createMovie(
    data: MovieUserInput,
    user: Document<unknown, any, User> & User
  ) {
    return await this.movieModel.createMovie({ ...data, userId: user._id });
  }

  async getAllNotDeletedMovies(userId: Types.ObjectId) {
    return await this.movieModel.model.find({
      deleted: { $ne: true },
      userId,
    });
  }

  async getMovieList(
    query: MoviesQuery,
    user: Document<unknown, any, User> & User
  ) {
    const allMovies = await this.getAllNotDeletedMovies(user._id);

    let limit;
    if (Number(query.limit) <= 8) {
      limit = 8;
    } else {
      limit = Number(query.limit) || 8;
    }

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

  async updateMovie(data: {
    movie: Partial<MovieUpdate>;
    id: string;
    userId: Types.ObjectId;
  }) {
    return await this.movieModel.updateMovie(data);
  }

  async deleteMovieImage(id: string, userId: Types.ObjectId) {
    const movieFile = await this.movieModel.getMovieFile(id, userId);

    if (movieFile && Array.isArray(movieFile)) {
      const file = movieFile[0] as GridFSFile;
      if (file && gfs && file._id) {
        await gfs.delete(new mongoose.Types.ObjectId(file._id));
      } else {
        throw new Error('File _id is missing or GridFS not initialized');
      }
    } else if (movieFile && !Array.isArray(movieFile)) {
      const file = movieFile as GridFSFile;
      if (file && gfs && file._id) {
        await gfs.delete(new mongoose.Types.ObjectId(file._id));
      } else {
        throw new Error('File _id is missing or GridFS not initialized');
      }
    } else {
      throw new Error('No file found');
    }
  }

  async deleteMovie(id: string, userId: Types.ObjectId) {
    await this.deleteMovieImage(id, userId);
    return await this.movieModel.deleteMovie(id, userId);
  }

  async updateMovieImage(data: {
    file: Express.Multer.File;
    id: string;
    userId: Types.ObjectId;
  }) {
    const { file, userId, id } = data;

    await this.deleteMovieImage(id, userId);

    return await this.uploadFileToGridFS(file, userId);
  }
}

export default MovieService;
