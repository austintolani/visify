import React, { useState, useEffect } from "react";
// import * as d3 from "d3";
var d3 = require("d3");

const BubbleChart = ({ songData, selectedSong }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const create = () => {
        //resources https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript

        d3.select("#selectedDetails").remove();

        let margin = { top: 10, right: 2, bottom: 30, left: 2 };

        var circlesVis = d3.select("#circlesVis");

        //Gets access to the div element created for this chart from HTML

        let svgWidth2 = d3
            .select("#song-vis-wrapper")
            .node()
            .getBoundingClientRect().width;
        let svgHeight2 = 60;

        //creates svg element within the div
        var svg2 = circlesVis
            .append("svg")
            .attr("id", "bubblechart")
            .attr("width", svgWidth2)
            .attr("height", svgHeight2);

        var div = d3
            .select("#circleVis")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var t = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);

        var genres = {};

        //for each genre, put the song names in a  of arrays with the genre name as the key
        songData.forEach(function (song) {
            for (let i = 0; i < song.genres.length; i++) {
                if (genres[song.genres[i]] === undefined) {
                    genres[song.genres[i]] = [];
                    genres[song.genres[i]].push(song.name);
                } else {
                    genres[song.genres[i]].push(song.name);
                }
            }
        });

        //map to 2d array
        var items = Object.keys(genres).map(function (key) {
            return [key, genres[key].length];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        //get top 10 for now
        var temp = items.slice(0, 10);
        var reverse = temp.reverse();
        var topGenres = temp.map((s, i) => ({
            category: s[0],
            count: temp[i][1],
        }));

        var textPos = [];
        var rectWidths = [];
        var xTrack = margin.left;
        var total = 0;
        topGenres.forEach(function (genre) {
            total += genre.count;
        });

        var totalWidth = svgWidth2 - margin.left - margin.right;

        var rowChart = svg2
            .selectAll("rect")
            .data(topGenres)
            .enter()
            .append("rect")
            .attr("y", margin.top)
            .attr("x", function (d) {
                var temp = xTrack;
                xTrack += (d.count / total) * totalWidth;
                textPos.push((xTrack - temp) / 2 + temp);
                return temp;
            })
            .attr("height", 50)
            // .attr("rx",5)
            // .attr("ry",5)
            .attr("fill", "#FFAECF")
            // .attr("border-radius","5px")
            .attr("stroke", "white")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .transition(t)
            .attr("width", function (d) {
                rectWidths.push((d.count / total) * totalWidth);
                return (d.count / total) * totalWidth;
            })


        function mouseover(event, d) {
            div.style("opacity", 0.9);
            div.html(
                "<strong>" +
                    d.category +
                    "</strong>" +
                    " comprised " +
                    "<br/>" +
                    "<strong>" +
                    Math.round((d.count / 40) * 1000) / 10 +
                    "</strong>" +
                    "% of your top songs," +
                    "<br/>" +
                    "appearing in" +
                    "<br/>" +
                    "<strong>" +
                    d.count +
                    "</strong>" +
                    " songs"
            )
                .style("left", event.pageX - 450 + "px")
                .style("top", event.pageY - 280 + "px");
        }

        function mouseout(event, d) {
            div.style("opacity", 0);
        }

        topGenres.forEach(function (f, i) {
            f.x = textPos[i];
            f.width = rectWidths[i];
        });

        var group1 = svg2.append("g").attr("transform", "translate(0,25)");

        group1
            .selectAll("text")
            .data(topGenres)
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", 10)
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.category;
            })
            .style("font-size", 12)
            .each(function (d, i) {
                if (this.getComputedTextLength() > d.width) {
                    d3.select(this).text("");
                }
            })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        var group2 = svg2.append("g").attr("transform", "translate(0,40)");

        // group2
        //     .selectAll("text")
        //     .data(topGenres)
        //     .enter()
        //     .append("text")
        //     .attr("x", function (d) {
        //         return d.x;
        //     })
        //     .attr("y", 0)
        //     .style("font-size", "12px")
        //     .style("text-anchor", "middle")
        //     .text(function (d) {
        //         return d.count;
        //     })
        //     .on("mouseover", mouseover)
        //     .on("mouseout", mouseout);
    };
    useEffect(() => {
        console.log("SelectedSong from bubblechart", selectedSong);
        if (isLoaded === false) {
            create();
            setIsLoaded(true);
        }
    });
    return <div id="circleVis"></div>;
};

export default BubbleChart;
