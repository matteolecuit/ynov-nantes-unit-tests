const mongoose = require("mongoose");
const { ToDo } = require("../toDoModel");

beforeAll(() => {
  const DB_URI = "mongodb://localhost:27017/toDoApp";
  mongoose
    .connect(DB_URI, { useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
});

const dateData = String(Date.now());
const createToDoData = [
  { text: "Nom" + dateData, expectedText: "Nom" + dateData },
  { text: "Super nom" + dateData, expectedText: "Super nom" + dateData },
];

describe.each(createToDoData)(
  "Create todo",
  (data) => {
    test(`${data.text} should return ${data.expectedText}`, async () => {
      const newToDo = new ToDo({ text: data.text });
      await newToDo.save();

      const toDos = await ToDo.find(
        { text: { $eq: data.text } },
        (err, docs) => {
          if (err) console.log(err);
          else return docs;
        }
      );
      expect(toDos.length).toBe(1);
      expect(toDos[0].text).toBe(data.expectedText);
    });
  },
  30000
);

const createToDoWithDoneData = [
  {
    text: "vrai" + dateData,
    done: true,
    expectedText: "vrai" + dateData,
    expectedDone: true,
  },
  {
    text: "faux" + dateData,
    done: false,
    expectedText: "faux" + dateData,
    expectedDone: false,
  },
];
describe.each(createToDoWithDoneData)(
  "Create todo",
  (data) => {
    test(`${data.done} should return ${data.expectedDone}`, async () => {
      const newToDo = new ToDo({ text: data.text, done: data.done });
      await newToDo.save();

      const toDos = await ToDo.find(
        { text: { $eq: data.text } },
        (err, docs) => {
          if (err) console.log(err);
          else return docs;
        }
      );
      expect(toDos.length).toBe(1);
      expect(toDos[0].text).toBe(data.expectedText);
      expect(toDos[0].done).toBe(data.expectedDone);
    });
  },
  30000
);
