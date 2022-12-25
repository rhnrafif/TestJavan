-- Note : RDBMS using SQL Server

--Create database
CREATE DATABASE AssetDB;

--Create tabels
CREATE TABLE asset (asset_id INT PRIMARY KEY IDENTITY(1,1), asset_name VARCHAR(20) );
CREATE TABLE parent (parent_id INT PRIMARY KEY IDENTITY(1,1), parent_name VARCHAR(20));
CREATE TABLE family_member
(family_member_id INT PRIMARY KEY IDENTITY(1,1), parent_id INT FOREIGN KEY REFERENCES parent(parent_id), names VARCHAR(20), gender VARCHAR(1))
CREATE TABLE family_asset 
(id INT PRIMARY KEY IDENTITY(1,1), family_member_id INT FOREIGN KEY REFERENCES family_member(family_member_id), 
asset_id INT FOREIGN KEY REFERENCES asset(asset_id))

--input asset record
INSERT INTO asset (asset_name) 
VALUES 
('Samsung Universe 9'),
('Samsung Galaxy Book'),
('iPhone 9'),
('iPhone X'),
('Huawei P30'),
('No Asset')

--input parent records
INSERT INTO parent(parent_name)
VALUES ('Budi'),('Nida'),('Andi'),('Sigit'),('Bani'),('No Parent')

--input family member records
INSERT INTO family_member (parent_id, names, gender)
VALUES
(6, 'Bani', 'L'),
(5, 'Budi','L'),
(1, 'Hari', 'L'),
(1, 'Siti', 'P'),
(5, 'Nida','P'),
(2, 'Bila', 'P'),
(2, 'Lesti', 'P'),
(5, 'Andi', 'L'),
(3, 'Diki', 'L'),
(5, 'Sigit', 'L'),
(4, 'Doni', 'L'),
(4, 'Toni', 'L')

--input family asset record (also as conjution table)
INSERT INTO family_asset (family_member_id, asset_id)
VALUES
(1, 6),
(2, 1), (2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 4),(7, 5),
(8, 1),
(9, 2),
(10, 5),
(11, 4),
(12, 6)
