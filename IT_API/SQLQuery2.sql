DROP TABLE IF EXISTS [dbo].[Customer];
Create Table Customer(
	Cid int identity(1,1),
	Name varchar(50),
	telPhone varchar(10),
	Email varchar(100),

	PRIMARY KEY (Cid)
)

DROP TABLE IF EXISTS [dbo].[Employee];
Create Table Employee(
	Eid			int identity(1,1),
	Name		varchar(50) NOT NULL,
	role		int NOT NULL,
	telPhone	varchar(10) NOT NULL,
	Email		varchar(100) NOT NULL,
	address		varchar(250) NOT NULL,

	PRIMARY KEY(Eid)
)

DROP TABLE IF EXISTS [dbo].[Product];
Create Table Product(
	Pid				int identity(1,1),
	brand			varchar(100),
	gen				varchar(100),
	Type			varchar(100),
	description		varchar(250),
	price			decimal(10,2),
	image			text,

	PRIMARY KEY(Pid)
)

DROP TABLE IF EXISTS [dbo].[Sale];
Create Table Sale(
	Sid				int identity(1,1) PRIMARY KEY,
	CustomerPhone	varchar(10),
	EmployeeId		int FOREIGN KEY REFERENCES Employee(Eid),
	saleDate		Date,
	totalAmount		int,
	totalPrice		decimal(10,2)
)

DROP TABLE IF EXISTS [dbo].[SalesDetail];
Create Table SalesDetail(
	SDid			int identity(1,1) PRIMARY KEY,
	SaleId			int NOT NULL FOREIGN KEY REFERENCES Sale(Sid),
	ProductId		int NOT NULL FOREIGN KEY REFERENCES Product(Pid),
	eachAmount		int,
	totalPrice		decimal(10,2),
)

DROP TABLE IF EXISTS [dbo].[onApprove];
Create Table onApprove(
	Id			int identity(1,1) PRIMARY KEY,
	Pid1		int NOT NULL FOREIGN KEY REFERENCES Product(Pid),
	Pid2		int NOT NULL FOREIGN KEY REFERENCES Product(Pid),
)

SELECT * FROM Customer
SELECT * FROM Employee
SELECT * FROM Product
SELECT * FROM Sale
SELECT * FROM SalesDetail
SELECT * FROM onApprove

SELECT * FROM Employee WHERE role = 2

SELECT	Customer.name, Customer.telPhone,Employee.name, Sale.saleDate FROM Customer, Employee, Sale
WHERE	Customer.telPhone = Sale.CustomerPhone
AND		Sale.EmployeeId = Employee.Eid


INSERT INTO Customer values('BH', '0952483572', 'BHR@gmail.com')
INSERT INTO Customer values('LN', '0834791248', 'LYNN@gmail.com')
INSERT INTO Customer values('Geforce Jackson', '0661973486', 'Geforce.JS@gmail.com')
INSERT INTO Customer values('James Mckay', '0915439758', 'Mckay2485@gmail.com')

INSERT INTO Employee VALUES('SomSak Banprasha',1,'0123456789','SS.BB@gmail.com','74/20')
INSERT INTO Employee VALUES('Mingbhan Hachita',2,'9874563210','TK_HT@gmail.com','70/4')
INSERT INTO Employee VALUES('Isara Hachita',1,'0721324659','ISR.HT@gmail.com','70/4')
INSERT INTO Employee VALUES('Gael Hunter',2,'0892589467','Hunter.F@gmail.com','23/10')

INSERT INTO Sale VALUES('0661973486', 10, '2023-07-09', 2, 430.00)
INSERT INTO Sale VALUES('0952186434', 13, '2023-07-09', 5, 2042.00)

DELETE FROM Employee
DELETE FROM Customer