const mysql = require('mysql');
const options = {
    cors: { origins: ["*:*"] },
    methods: ["GET", "POST"],
    credentials: false
};
const io = require('socket.io')(options)
let port_no = 3000;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'techprimelab'
});

/* connection.connect(function (err) {
    if (err) throw err;
    connection.query("select * from user", function (err, result) {
        if (err) throw err;
        console.log("all data: ", result)
    })
}); */

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
    await connection.query("select DATE_FORMAT(StartDate,'%Y-%m-%d') StartDate,DATE_FORMAT(EndDate,'%Y-%m-%d') EndDate,Category,Dept,Division,Location,Priority,ProjectName,Reason,Type,Status,idProject from project", function (err, result) {
        if (err) throw err;
        // console.log("all data: ", result);
        client.emit("setProject", result);
    })
}

async function InsertProject(data, client) {
    Category = data.Category;
    Dept = data.Dept;
    Division = data.Division;
    Location = data.Location;
    Priority = data.Priority;
    ProjectName = data.ProjectName;
    Reason = data.Reason;
    Type = data.Type;
    Status = data.Status;
    StartDate = data.StartDate;
    EndDate = data.EndDate;
    connection.query("insert into project (Category,Dept,Division,Location,Priority,ProjectName,Reason,Type,Status,StartDate,EndDate) value('" + Category + "','" + Dept + "','" + Division + "','" + Location + "','" + Priority + "','" + ProjectName + "','" + Reason + "','" + Type + "','" + Status + "','" + StartDate + "','" + EndDate + "')", function (err, result) {
        if (err) throw err;
        console.log("all data: ", result);
        client.emit("inserted", result);
        getProject(data, client);
    })
}

async function UpdateProject(data, client) {
    Status = data.Status;
    id = data.data.idProject
    connection.query("update project SET Status = '" + Status + "' WHERE idProject = " + id + "", function (err, result) {
        if (err) throw err;
        console.log("all data: ", result);
        client.emit("inserted", result);
        getProject(data, client);
    })
}

io.on('connection', (client) => {
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
})

io.listen(4201)
setInterval(broadcast_msg, port_no)
function broadcast_msg() {
    io.emit("alert_all", { "Server Time": new Date() })
    console.log("Server running on port: " + port_no)
}
