import { Router } from "express";
import { URL } from "url";
import fetch from "node-fetch";

const router = Router();
const sourceUrl = new URL(
  "https://datasource.kapsarc.org/api/records/1.0/search/?dataset=saudi-arabia-coronavirus-disease-covid-19-situation&sort=-date&facet=cumulative&facet=indicator&facet=date&facet=event&facet=region&rows=1000&facet=city",
);

router.get("/", async (_req, res) => {
  const url = `${sourceUrl.toString()}&q=city=Total`; //&q=city=dahran
  const response = await fetch(url);
  const data = await response.json();
  const flds = data.records
    .map((v: any) => v.fields)
    .filter(
      (vv: any) =>
        vv.indicator.toLowerCase() === "cases" &&
        vv.daily_cumulative.toLowerCase() === "cumulative",
    );
  res.render("index");
});

router.post("/", (req, res) => {
  const {
    body: { name },
  } = req;
  res.json({
    name: name || "nothing",
  });
});

export default router;
