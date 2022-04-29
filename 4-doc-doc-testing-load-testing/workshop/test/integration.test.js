const mongoose = require("mongoose");
const { ToDo } = require("../toDoModel");

beforeAll(async () => {
  await mongoose
    .connect("mongodb://mongo:27017/toDoApp", {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
});

const createToDoData = [
  { text: "Nom", expectedText: "Nom" },
  { text: "Super nom", expectedText: "Super nom" },
];

describe.each(createToDoData)("Create todo", (data) => {
  test(`${data.text} should return ${expectedText}`, async () => {
    const newToDo = new ToDo({ text: data.text });
    await newToDo.save();

    const toDos = await ToDo.find({ text: { $eq: data.text } }, (err, docs) => {
      if (err) console.log(err);
      else return docs;
    });
    expect(toDos.length).toBe(1);
    expect(toDos[0].text).toBe(data.expectedText);
  });
});
