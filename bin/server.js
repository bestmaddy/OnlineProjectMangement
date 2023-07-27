const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'techprimelab',
});

// Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/'); // Specify the directory where you want to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

const checkFileType = function (file, cb) {
    // Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    // Check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can only upload images!");
    }
};

// Initializing multer
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: '10mb' },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

app.post('/SaveProduct', upload.single('image'), (req, res) => {
    console.log("product", req);
    // console.log("file", req.file);

    const { path, title, description, qty, price, date } = req;
    // const { filename } = req.file;

    const sql = 'INSERT INTO product (path, title, description, qty, price, date) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [path, title, description, qty, price, date];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error uploading image:', err);
            res.status(500).json({ success: false, message: 'Error uploading image' });
        } else {
            console.log('Image uploaded to MySQL database!');
            res.json({ success: true, message: 'Image uploaded successfully' });
        }
    });
});


async function Login(data, client) {
    userName = data.userName;
    password = data.password;
    connection.query("select * from user where UserName='" + userName + "'and Password='" + password + "'", function (err, result) {
        if (err) {
            client.emit("Loginstatus", "unsuccess");
            console.log("all data: ", result);
        } else if (result != 0) {
            console.log("all data: ", result);
            client.emit("Loginstatus", { "success": "success", "data": result });
        } else {
            client.emit("Loginstatus", { "unsuccess": "unsuccess", "data": result });
        }
    })
}
// } else if (result.RowDataPacket.UserName == userName && result.RowDataPacket.Password == password) {
async function getProject(data, client) {
    connection.query("select DATE_FORMAT(StartDate,'%Y-%m-%d') StartDate,DATE_FORMAT(EndDate,'%Y-%m-%d') EndDate,Category,Dept,Division,Location,Priority,ProjectName,Reason,Type,Status,idProject from project", function (err, result) {
        if (err)
            throw err;
        // console.log("all data: ", result);
        client.emit("setProject", result);
    })
}

async function InsertProject(data, client) {
    /* Category = data.Category;
    Dept = data.Dept;
    Division = data.Division;
    Location = data.Location;
    Priority = data.Priority;
    ProjectName = data.ProjectName;
    Reason = data.Reason;
    Type = data.Type;
    Status = data.Status;
    StartDate = data.StartDate;
    EndDate = data.EndDate; */
    const { Category, Dept, Division, Location, Priority, ProjectName, Reason, Type, Status, StartDate, EndDate } = data;
    const sql = "INSERT INTO project (Category, Dept, Division, Location, Priority, ProjectName, Reason, Type, Status, StartDate, EndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [Category, Dept, Division, Location, Priority, ProjectName, Reason, Type, Status, StartDate, EndDate];

    connection.query(sql, values, function (err, result) {
        if (err)
            throw err;

        console.log("Inserted data: ", result);
        client.emit("inserted", result);
        getProject(data, client);
    });
}

async function UpdateProject(data, client) {
    Status = data.Status;
    id = data.data.idProject
    connection.query("update project SET Status = '" + Status + "' WHERE idProject = " + id + "", function (err, result) {
        if (err)
            throw err;
        console.log("all data: ", result);
        client.emit("inserted", result);
        getProject(data, client);
    })
}


io.on('connection', (client) => {
    console.log('A client connected');

    // Handle socket events here
    client.on("Login", (data) => {
        Login(data, client)
        console.log(data)
    })
    client.on("GetProject", (data) => {
        getProject(data, client)
    })
    client.on("InsertProjectn", (data) => {
        InsertProject(data, client)
        console.log(data);
    })
    client.on("UpdateStatus", (data) => {
        UpdateProject(data, client)
    })
    client.on("GetProduct", (data) => {
        GetProduct(data, client)
    })
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
