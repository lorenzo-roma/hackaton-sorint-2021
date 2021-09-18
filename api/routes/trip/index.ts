import express from "express";
import ResponseAdapterMiddleware from "../../middlewares/response-adapter-middleware";
import ControllerProvider from "../../controllers/provider";
import TripController from "../../controllers/trip-controller";

const router = express.Router();

const tripController: TripController = ControllerProvider.getTripController();

router.post(
    "/",
    new ResponseAdapterMiddleware(tripController.createTrip).handler
);
router.get(
    "/",
    new ResponseAdapterMiddleware(tripController.retrieveTrips).handler
);

export default router;
