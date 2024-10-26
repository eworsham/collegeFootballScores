import ExternalServices from "./externalServices.mjs";
import ScoreDetails from "./ScoreDetails.mjs";

const externalServices = new ExternalServices()
const dataSource = await externalServices.getData()

const scoreDetails = new ScoreDetails(dataSource)

scoreDetails.init()