SET NAMES UTF8;
DROP DATABASE IF EXISTS iqos;
CREATE DATABASE iqos CHARSET=UTF8;
USE iqos;

/** 用户表 **/
CREATE TABLE iqos_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),                                         
  phone VARCHAR(16),                                          
  upwd VARCHAR(32)                                         
);

/** 用户 **/
INSERT INTO iqos_user VALUE 
(1,"管理员",13097305153,"iqos123.");

UPDATE iqos_user SET phone=13097305153 WHERE upwd=iqos123.

/** 图片表(商品详情的图片) **/
CREATE TABLE iqos_bannerimg(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,                                                 #商品的id
  details_pic VARCHAR(128)                                         #图片
);
INSERT INTO iqos_bannerimg VALUE
(NULL,1,"images/product/13005312040.png"),
(NULL,2,"images/product/13005312040.png"),
(NULL,3,"images/product/13005312040.png"),
(NULL,4,"images/product/13005312040.png"),
(NULL,5,"images/product/13005312040.png"),
(NULL,6,"images/product/13005312040.png"),
(NULL,7,"images/product/13005312040.png");

/** 图片表(轮播的图片) **/
CREATE TABLE iqos_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  carousel_pic VARCHAR(128)
);
INSERT INTO iqos_carousel VALUE
(NULL,"images/product/13005312040.png"),
(NULL,"images/product/13005312040.png"),
(NULL,"images/product/13005312040.png");

/** 图片表(产品的图片) **/
CREATE TABLE iqos_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,                                                 #商品的id
  product_pic VARCHAR(128)                                         #图片
);
INSERT INTO iqos_product VALUE
(NULL,"images/product/13005312040.png"),
(NULL,"images/product/13005312040.png"),
(NULL,"images/product/13005312040.png");

/** 图片表(微信图片) **/
CREATE TABLE iqos_weixin(
  wxid INT PRIMARY KEY AUTO_INCREMENT,                                                 #商品的id
  wx_txt VARCHAR(128),                                            #微信ID
  wx_pic VARCHAR(128)                                         #微信二维码
);
INSERT INTO iqos_weixin VALUE
(NULL,"gulangkun","images/product/13005312040.png");

/** 图片表(商品详情的图片) **/
CREATE TABLE iqos_bannertxt(
  tid INT PRIMARY KEY AUTO_INCREMENT,                                                #文字的id
  head_title VARCHAR(128),                                         #标题
  head_txt VARCHAR(60000)                                         #文字
);
INSERT INTO iqos_bannertxt VALUE
(null,"标题","文字文字文字文字文字文字文字");