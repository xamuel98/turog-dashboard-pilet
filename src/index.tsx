import * as React from "react";
import "./styles/main.scss";
import { Link } from "react-router-dom";
import type { PiletApi } from "sample-piral";

const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));

export function setup(app: PiletApi) {
  app.registerPage("/dashboard", DashboardPage);
  app.registerPage("/dashboard/:id", PostDetail);

  app.registerMenu(() => <Link to="/dashboard">Dashboard</Link>);

  app.registerTile(() => <div>Welcome to the Dashboard Pilet!</div>, {
    initialColumns: 2,
    initialRows: 2,
  });
}
