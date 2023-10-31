import express from "express";
import jwt from "jsonwebtoken";
import {
  createEntity,
  deleteEntity,
  editEntity,
  editEntityLeave,
  editEntityPortFolio,
  editEntityReq,
  editEntityTask,
  getAllEntity,
  getAllEntityEmail,
  getAllEntityEmail1,
  getAllEntityType,
  editEntityQuery,
  getAllEntityChat,
} from "../DB/db-utility.js";
import { authchk } from "../Middleware/auth-chk.js";
import upload from "../Middleware/multer.js";

const datarouter = express.Router();

datarouter.get("/classes", authchk, async (req, res) => {
  const val = await getAllEntity("classes");
  console.log(val);
  res.send(val);
});

datarouter.get("/webcodecapstone/:type", authchk, async (req, res) => {
  const { type } = req.params;
  const val = await getAllEntityType("webcastone", type);
  console.log(val);
  res.send(val);
});

datarouter.get("/webcapsubmit", authchk, async (req, res) => {
  const val = await getAllEntity("tasksubmit");
  console.log(val);
  res.send(val);
});

datarouter.get("/leave", authchk, async (req, res) => {
  const val = await getAllEntity("leave");
  console.log(val);
  res.send(val);
});

datarouter.get("/requirements", authchk, async (req, res) => {
  const val = await getAllEntity("requirements");
  console.log(val);
  res.send(val);
});

datarouter.get("/applicationlist", authchk, async (req, res) => {
  const val = await getAllEntity("requirementsApplications");
  console.log(val);
  res.send(val);
});

datarouter.get("/upload", async (req, res) => {
  const val = await getAllEntity("uploads");
  console.log(val[0].file);
  res.download(val[0].file);
});

datarouter.get("/tasks", async (req, res) => {
  const val = await getAllEntity("tasks");
  console.log(val);
  res.send(val);
});

datarouter.get("/portfolio", async (req, res) => {
  const val = await getAllEntity("portfolio");
  console.log(val);
  res.send(val);
});

datarouter.get("/additionalClass", async (req, res) => {
  const val = await getAllEntity("additionalClass");
  console.log(val);
  res.send(val);
});

datarouter.get("/queries", async (req, res) => {
  const val = await getAllEntity("queries");
  console.log(val);
  res.send(val);
});

datarouter.get("/mock", async (req, res) => {
  const val = await getAllEntity("mock");
  console.log(val);
  res.send(val);
});

datarouter.put("/webcapsubmit", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntity("tasksubmit", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.put("/leave", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntityLeave("leave", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.put("/queries", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntityQuery("queries", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.put("/portfolio", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntityPortFolio("portfolio", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.put("/requirements", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntityReq("requirements", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.put("/tasks", authchk, async (req, res) => {
  const dataObj = req.body;
  console.log("put", dataObj);
  const val = await editEntityTask("tasks", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.post("/queries", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("queries", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/leave", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("leave", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/task", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("tasks", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/webcodecapstone", authchk, async (req, res) => {
  const obj = req.body;
  let responses = "";
  await jwt.verify(
    req.headers["accesstoken"],
    process.env.JWT_SECRET,
    async (err, decoded) => {
      console.log("decoded", decoded);
      if (err) {
        console.log(err);
        return err;
      } else {
        responses = await createEntity("webcastone", obj);
        console.log(responses);
      }
    }
  );
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/webcapsubmit", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("tasksubmit", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/additionalClass", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("additionalClass", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/classes", authchk, async (req, res) => {
  const obj = req.body;
  const responses = await createEntity("classes", obj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.get("/queries/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("queries", email);
  console.log(val);
  res.send(val);
});

datarouter.get("/leave/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("leave", email);
  console.log(val);
  res.send(val);
});

datarouter.get("/tasks/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("tasks", email);
  console.log(val);
  res.send(val);
});

datarouter.get("/portfolio/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("portfolio", email);
  console.log(val);
  res.send(val);
});

datarouter.get("/applicationlist/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("requirementsApplications", email);
  console.log(val);
  res.send(val);
});

datarouter.get("/mock/:email", authchk, async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const val = await getAllEntityEmail("mock", email);
  console.log(val);
  res.send(val);
});

datarouter.post("/webcapsubmit/:email", authchk, async (req, res) => {
  let dataObj = req.body;
  const { email } = req.params;
  dataObj = {
    ...dataObj,
    email: email,
  };
  console.log(email);
  const val = await getAllEntityEmail1("tasksubmit", dataObj);
  console.log(val);
  res.send(val);
});

datarouter.post("/upload", upload.single("file"), authchk, async (req, res) => {
  const { name } = req.body;
  console.log(req.body, name, "path  ", req.file);
  const file = req.file.path;
  const obj = {
    name: name,
    file: file,
  };
  const val = await createEntity("uploads", obj);
  if (val.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/requirements", authchk, async (req, res) => {
  let dataObj = req.body;
  console.log(dataObj);
  let reqId = Math.ceil(1000 + Math.random() * 9000);

  dataObj = {
    ...dataObj,
    reqId: reqId,
    appliedBy: [],
  };
  console.log(dataObj);
  const responses = await createEntity("requirements", dataObj);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/requirements/:email", authchk, async (req, res) => {
  let dataObj = req.body;
  delete dataObj["appliedBy"];
  delete dataObj["_id"];
  console.log("test", dataObj);
  const responses = await createEntity("requirementsApplications", dataObj);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/mock", authchk, async (req, res) => {
  let dataObj = req.body;
  const responses = await createEntity("mock", dataObj);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/portfolio", authchk, async (req, res) => {
  let dataObj = req.body;
  const responses = await createEntity("portfolio", dataObj);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During insertion" });
  }
});

datarouter.post("/deleteClass", authchk, async (req, res) => {
  const obj = req.body;
  console.log(obj);
  let responses = "";
  if (obj.type === "roadmap") {
    responses = await deleteEntity("classes", obj);
  } else {
    responses = await deleteEntity("additionalClass", obj);
  }

  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Deleted Successfully" });
  } else {
    res.send({ msg: "Error During deletion" });
  }
});

datarouter.post("/chats", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  let responses = await createEntity("chats", data);
  console.log(responses);
  if (responses.acknowledged == true) {
    res.send({ msg: "Inserted Successfully" });
  } else {
    res.send({ msg: "Error During Insertion" });
  }
});

datarouter.get("/chats/:room", authchk, async (req, res) => {
  const { room } = req.params;
  console.log(room, room);
  const val = await getAllEntityChat("chats", room);
  console.log("val", val);
  res.send(val);
});

export default datarouter;
