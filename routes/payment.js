const keyPublishable = "pk_test_mThCbSbAHQnWYQbpDXbXigYV";
const keySecret = "sk_test_znbs3Jywgi0XzWxWI4nUaLBb";

const app = require("express")();
const stripe = require("stripe")(keySecret);



app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", (req, res) =>
  res.render("../../views/index.pug", {keyPublishable}));

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("../../views/charge.pug"));
});

app.listen(4567);