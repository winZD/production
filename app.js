const express = require("express");
let cors = require("cors");
const app = express();

const path = require("path");

const port = process.env.PORT || 5000; //doda za produkciju process.env.PORT
const bodyParser = require("body-parser");
const logger = require("morgan");

//const passport = require("passport");
//const passportJWT = require("passport-jwt");
// ExtractJwt to help extract the token
//let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
//let JwtStrategy = passportJWT.Strategy;
//let jwtOptions = {};
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//jwtOptions.secretOrKey = "wowow";
const bcrypt = require("bcryptjs");
//////////////////////////////////////
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
//const secret = "mysecretsshhh";
const pdf = require("html-pdf");
const pdfTemplate = require("./documents/index.js");
//////////////////////////////////////SQLITE/////////
const sqlite3 = require("sqlite3").verbose();
//const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
//const { where } = require("./schema/data");
const withAuth = require("./middleware");
const router = express.Router();

const User = require("./model/User");

const secret = "wowow";
/////////////////////////////////////
// Passport Config
//require("./controller/passport-config")(passport);
///

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(express.static(__dirname + "/public"));
//passport middleware
//app.use(passport.initialize());
//app.use(passport.session());
///////////////////////////////////////////////////////////pokušaj authentifikacije
const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

////
app.use(express.urlencoded({ extended: false }));
//app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//za ruter mistp
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

app.use(logger("dev"));
////////////////////////////////////////////////////////
let db3 = new sqlite3.Database("schoolbox.db");
db3.serialize(() => {
  db3.run(
    "CREATE TABLE IF NOT EXISTS professors (professors_id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT NOT NULL UNIQUE, status TEXT, email TEXT NOT NULL UNIQUE,date INTEGER)"
  );
  db3.run(
    "CREATE TABLE IF NOT EXISTS days (days_id INTEGER PRIMARY KEY AUTOINCREMENT, day_name TEXT NOT NULL UNIQUE)"
  );
  db3.run(
    "CREATE TABLE IF NOT EXISTS cabinets (cabinets_id INTEGER PRIMARY KEY AUTOINCREMENT, cabinet_number INTEGER NOT NULL UNIQUE)"
  );
  db3.run(
    "CREATE TABLE IF NOT EXISTS courses (courses_id INTEGER PRIMARY KEY AUTOINCREMENT, course_name TEXT NOT NULL UNIQUE)"
  );
  db3.run(
    "CREATE TABLE IF NOT EXISTS departments (departments_id INTEGER PRIMARY KEY AUTOINCREMENT, department_name TEXT NOT NULL UNIQUE)"
  );

  db3.run(
    "CREATE TABLE IF NOT EXISTS prof_day_cab_cou_dep (id INTEGER PRIMARY KEY AUTOINCREMENT, professors_id INTEGER,days_id INTEGER,cabinets_id INTEGER,courses_id INTEGER,departments_id INTEGER,full_date TEXT NOT NULL,time_change_begin TEXT NOT NULL,time_change_until TEXT NOT NULL)"
  );
  db3.run(
    "CREATE TABLE IF NOT EXISTS dates (dates_id INTEGER PRIMARY KEY AUTOINCREMENT, full_date TEXT NOT NULL,time_change_begin TEXT NOT NULL,time_change_until TEXT NOT NULL)"
  );

  db3.run(
    "CREATE TABLE IF NOT EXISTS register_users (users_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL UNIQUE)"
  );
});

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./schoolbox.db",
  },
  useNullAsDefault: false,
});

//sequelize.sync();

/////////////////////////////////////////////express session
/*app.use(
  session({
    name: "JSESSION",
    secret: "MYSECRETISVERYSECRET",

    resave: true,  
    saveUninitialized: true,
  })
);*/

////sqlite///////////////////////////////////////////////////////////////////////////////////////
/*create table
let db3 = new sqlite3.Database("schoolbox.db");
db3.serialize(() => {
  db3.run(
    "CREATE TABLE profesori(id INT, fullName TEXT UNIQUE, courses TEXT, department TEXT)"
  );
});
*/
//connecting to databse
/*
let db3 = new sqlite3.Database("./sqliteDB.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLITE TEST database.");
});
*/

/*
//inserting data
db3.run(
  `INSERT INTO profesori(id,fullName,courses,department) VALUES(3,"Dino Županović","Inovacije u informatici","IT")`,

  function (err) {
    if (err) {
      return console.log(err.message);
    }
    //  insert
    console.log(`Inserted succesfully!!`);
  }
);
*/
/*queriing datat from database
let sql = `SELECT * FROM profesori
           ORDER BY id`;

db3.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.id, row.fullName, row.courses, row.department);
  });
});

router.get("/getSQLITEdata", (req, res) => {
  let sql = `SELECT * FROM profesori
           ORDER BY id`;
  let data = [];
  db3.serialize(() => {
    db3.all(sql, data, (err, rows) => {
      if (err) {
        throw err;
      }

      rows.forEach((row) => {
        data.push({
          id: row.id,
          fullName: row.fullName,
          courses: row.courses,
          department: row.department,
        });
      });
      console.log(data);
    });
    return res.render({ data: data });
  });
});
*/

const createTable = async () => {
  try {
    await knex.schema.createTable("Stupanj obrazovanja", (tbl) => {
      tbl.increments(), tbl.integer("broj stupnja"), tbl.timestamps(true, true);
    });
  } catch (err) {
    console.log(err);
  }
};
//createTable();

router.get("/getDataProfessors", async (req, res) => {
  try {
    const data = await knex.select().table(`professors`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting data" });
  }
});

router.get("/getDataCabinets", async (req, res) => {
  try {
    const data = await knex.select().table(`cabinets`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting data" });
  }
});

router.get("/getDataDays", async (req, res) => {
  try {
    const data = await knex.select().table(`days`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting data" });
  }
});

router.get("/getDataDepartments", async (req, res) => {
  try {
    const data = await knex.select().table(`departments`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting data" });
  }
});

router.get("/getDataCourses", async (req, res) => {
  try {
    const data = await knex.select().table(`courses`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting data" });
  }
});
//datumi za admina
router.post("/postDates", async (req, res) => {
  const { dates, time_change_begin, time_change_until } = req.body;

  try {
    const data = await knex("dates").insert({
      full_date: dates,
      time_change_begin: time_change_begin,
      time_change_until: time_change_until,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error posting data" });
  }
});

//za admina

router.post("/postProfDayCabCouDep", async (req, res) => {
  const {
    dates,
    time_change_begin,
    time_change_until,
    days_id,
    professors_id,
    departments_id,
    course_id,
    cabinets_id,
  } = req.body;

  try {
    const data = await knex("prof_day_cab_cou_dep").insert({
      days_id: days_id,
      professors_id: professors_id,
      departments_id: departments_id,
      courses_id: course_id,
      cabinets_id: cabinets_id,
      full_date: dates,
      time_change_begin: time_change_begin,
      time_change_until: time_change_until,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error posting data" });
  }
});
//za admina
router.get("/profDayCabCouDep", async (req, res) => {
  try {
    const data = await knex(`professors`)
      .join(
        `prof_day_cab_cou_dep`,
        `professors.professors_id`,
        `=`,
        `prof_day_cab_cou_dep.professors_id`
      )
      .join(
        `departments`,
        `departments.departments_id`,
        `=`,
        `prof_day_cab_cou_dep.departments_id`
      )
      .join(
        `courses`,
        `courses.courses_id`,
        `=`,
        `prof_day_cab_cou_dep.courses_id`
      )
      .join(`days`, `days.days_id`, `=`, `prof_day_cab_cou_dep.days_id`)
      .join(
        `cabinets`,
        `cabinets.cabinets_id`,
        `=`,
        `prof_day_cab_cou_dep.cabinets_id`
      ) 
      .select(
        `prof_day_cab_cou_dep.id`,
        `professors.full_name`,
        `professors.email`,
        `departments.department_name`,
        `courses.course_name`,
        `days.day_name`,
        `cabinets.cabinet_number`,
        `prof_day_cab_cou_dep.full_date`,
        `prof_day_cab_cou_dep.time_change_begin`,
        `prof_day_cab_cou_dep.time_change_until`
      );

    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});
//brisanje stavki u join tablici
router.delete(`/removeProfDayCabCouDep/:id`, async (req, res, next) => {
  let id = req.params.id.split(",");
  try {
    for (let i = 0; i < id.length; i++) {
      console.log(id[i]);
      const data = await knex("prof_day_cab_cou_dep").where("id", id[i]).del();
      console.log("Success on deleting ID: ", id[i]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

////funkcija za kreiranje pdf-a
router.post(`/createPDF`, async (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile(`obrasci.pdf`, (err) => {
    if (err) {
      res.status(500).json({ err });
    }
    res.status(200).json({ success: "success" });
  });
});

router.get(`/fetchPDF`, async (req, res) => {
  res.sendFile(`${__dirname}/obrasci.pdf`);
});

///////za klijenta pretraživanje

router.post(`/postSearchProfDayCabCouDep`, async (req, res) => {
  const {
    full_date,
    days_id,
    professors_id,
    departments_id,
    course_id,
    cabinets_id,
  } = req.body;

  try {
    const data = await knex(`professors`)
      .join(
        `prof_day_cab_cou_dep`,
        `professors.professors_id`,
        `=`,
        `prof_day_cab_cou_dep.professors_id`
      )
      .join(
        `departments`,
        `departments.departments_id`,
        `=`,
        `prof_day_cab_cou_dep.departments_id`
      )
      .join(
        `courses`,
        `courses.courses_id`,
        `=`,
        `prof_day_cab_cou_dep.courses_id`
      )
      .join(`days`, `days.days_id`, `=`, `prof_day_cab_cou_dep.days_id`)
      .join(
        `cabinets`,
        `cabinets.cabinets_id`,
        `=`,
        `prof_day_cab_cou_dep.cabinets_id`
      )
      .select(
        `prof_day_cab_cou_dep.id`,
        `professors.full_name`,
        `professors.email`,
        `departments.department_name`,
        `courses.course_name`,
        `days.day_name`,
        `cabinets.cabinet_number`,
        `prof_day_cab_cou_dep.full_date`
      )
      .where(function () {
        this.where(`professors.professors_id`, `=`, `${professors_id}`)
          .orWhere(`departments.departments_id`, `=`, `${departments_id}`)
          .orWhere(`courses.courses_id`, `=`, `${course_id}`)
          .orWhere(`cabinets.cabinets_id`, `=`, `${cabinets_id}`)
          .orWhere(`days.days_id`, `=`, `${days_id}`)
          .orWhere(`prof_day_cab_cou_dep.full_date`, `=`, `${full_date}`);
      });

    res.status(200).json(data);

    console.log(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//pretraživanje za popup tjedni raspored
router.post("/weekData", async (req, res) => {
  const { days_id } = req.body;
  try {
    const data = await knex(`professors`)
      .join(
        `prof_day_cab_cou_dep`,
        `professors.professors_id`,
        `=`,
        `prof_day_cab_cou_dep.professors_id`
      )
      .join(
        `departments`,
        `departments.departments_id`,
        `=`,
        `prof_day_cab_cou_dep.departments_id`
      )
      .join(
        `courses`,
        `courses.courses_id`,
        `=`,
        `prof_day_cab_cou_dep.courses_id`
      )
      .join(`days`, `days.days_id`, `=`, `prof_day_cab_cou_dep.days_id`)
      .join(
        `cabinets`,
        `cabinets.cabinets_id`,
        `=`,
        `prof_day_cab_cou_dep.cabinets_id`
      )
      .select(
        `prof_day_cab_cou_dep.id`, 
        `professors.full_name`,
        `professors.email`,
        `departments.department_name`,
        `courses.course_name`,
        `days.day_name`,
        `cabinets.cabinet_number`,
        `prof_day_cab_cou_dep.full_date`,
        `prof_day_cab_cou_dep.time_change_begin`,
        `prof_day_cab_cou_dep.time_change_until`
      )
      .where(`days.days_id`, `=`, `${days_id}`);

    res.status(200).json(data);
    console.log(days_id);
    console.log(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/loginusers", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // we get the user with the name and save the resolved promise

    let user = await getUser({ email });
    if (!user) {
      res
        .status(401)
        .json({ msg: `Korisnik sa e-mailom ${email} ne postoji!`, user });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        //token se dodjeljuje na određeni email
        const payload = { email: user.email };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        //sprema u local storage
        //const data = { auth: true, token: token };
        //res.status(200).json(data);

        //sprema ga u cookies od browsera NE u local storage
        res.cookie("token", token, { withCredentials: true }).sendStatus(200);
        //res.json({ msg: "ok", token: token });
      } else {
        res.status(401).json({ email });
      }
    });
  }
});
//closing connection
/*
db3.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the SQLITE TEST database connection.");
});
*/
///////////////////////////////////////////////////////////////////////////////////////////////////

////////************za sqlite//////////////////////////////////

//register users
router.post("/registerUsers", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { username, email, password } = req.body;

    const data = await knex("register_users").insert({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ message: "Error posting data" });
    res.render("/login");
  }
});

///////////////////////*****************************************////////////////////////////////////////////

router.get("/checkToken", withAuth, function (req, res) {
  res.send(req.cookies.token);
});

router.get("/signOut", function (req, res) {
  cookies.remove(req.cookies.token);
});

/////////////////////////////////////////////

// lets create our strategy for web token
/*let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
*/
// use the strategy
//passport.use(strategy);

// append /api for our http requests
app.use("/api", router);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
/**  if (process.env.NODE_ENV === "production") {
}
*/
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
