// https://observablehq.com/@d3/line-chart/2

import * as d3 from "d3";
// import aapl from "../assets/aapl.json";
import { useEffect, useRef } from "react";

export default function RedirectGraph() {
    const aapl = [{date: '2007-04-23T00:00:00.000Z', close: 93.24}]
    console.log(aapl);
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(aapl, d => d.close)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));

    console.log(line(aapl));

    const gx = useRef();
    const gy = useRef();

    useEffect(() => {
        d3.select(gx.current)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    }, [gx, x]);

    useEffect(() => {
        d3.select(gy.current)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Daily close ($)"));
    }, [gy, y]);

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ maxWidth: "100%", height: "auto", height: "intrinsic"}}
        >
            <g ref={gx} transform={`translate(0,${height - marginBottom})`}></g>
            <g ref={gy} transform={`translate(${marginLeft},0)`}></g>
            {/* <path
                fill="none"
                stroke="steelblue"
                strokeWidth={1.5}
                d={line(aapl)}
            /> */}
        </svg>
    );
}