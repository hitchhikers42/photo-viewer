DROP DATABASE IF EXISTS fec_images;
CREATE DATABASE fec_images;

USE fec_images;
CREATE TABLE img (
  imgKey VARCHAR (24) NOT NULL,
  productId VARCHAR (24) NOT NULL,
  bucket VARCHAR(24) NOT NULL,
  title VARCHAR(255) NOT NULL
);