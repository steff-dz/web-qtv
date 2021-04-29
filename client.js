import sanity from "@sanity/client";

export default sanity({
  projectId: "esxaee5e",
  dataset: "production",
  apiVersion: "2021-04-29",
  useCdn: false,
});
