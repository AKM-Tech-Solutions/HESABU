import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  StackingColumnSeries,
  Category,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { graphData } from "../../../data/mockData/gridOutlook";
import { useStateContext } from "../../../contexts/ContextProvider";
import "./Graph.css";

const Graph = () => {
  const { currentMode } = useStateContext();
  const themeClass = currentMode === "Dark" ? "Dark" : "Light";

  return (
    <div className={`Graph ${themeClass}`} data-theme={themeClass}>
      <ChartComponent
        primaryXAxis={{
          valueType: "Category",
          title: "Month",
          labelStyle: { color: currentMode === "Dark" ? "#FFFFFF" : "#000000" },
        }}
        primaryYAxis={{
          title: "Stock",
          labelFormat: "{value}",
          labelStyle: { color: currentMode === "Dark" ? "#FFFFFF" : "#000000" },
        }}
        title="Stock Report"
        titleStyle={{ color: currentMode === "Dark" ? "#FFFFFF" : "#000000" }}
        tooltip={{ enable: true }}
        legendSettings={{
          visible: true,
          textStyle: { color: currentMode === "Dark" ? "#FFFFFF" : "#000000" },
        }}
        background={currentMode === "Dark" ? "#33373E" : "#FFFFFF"}
        style={{ border: "none" }}
      >
        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={graphData}
            xName="month"
            yName="stockIn"
            name="Stock In"
            type="StackingColumn"
            fill="#80DAEB"
          />
          <SeriesDirective
            dataSource={graphData}
            xName="month"
            yName="stockOut"
            name="Stock Out"
            type="StackingColumn"
            fill="#A569BD"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Graph;
