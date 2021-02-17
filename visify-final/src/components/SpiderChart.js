import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const SpiderChart = ({ songData2, selectedSong }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const create = () => {
        //resource https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

        d3.select("#spiderChart").remove();

        //let self2 = this
        let margin = { top: 10, right: 10, bottom: 30, left: 50 };

        var spiderVis = d3.select("#spider-chart");

        //Gets access to the div element created for this chart from HTML
        //let svgBounds = spiderVis.node().getBoundingClientRect();
        //let svgWidth = (svgBounds.width - margin.left - margin.right)/2;
        // let svgWidth = 600;
        let svgHeight = 250;
        let svgWidth =
            d3.select("#spider-chart").node().getBoundingClientRect().width -
            margin.left -
            margin.right;

        let legendHeight = 100;
        let legendWidth = 200;
        let colors = {
            "Average of All Songs": "pink",
            "Selected Song": "#1DB954",
        };
        let legendLabels = ["Average of All Songs"];
        if (selectedSong) {
            legendLabels.push("Selected Song");
        }

        //creates svg element within the div
        var svg = spiderVis
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("id", "spiderChart");

        // Create and append the legend
        var legend = svg
            .append("g")
            .attr("width", legendWidth)
            .attr("height", legendHeight);
        legend
            .append("text")
            .attr("class", "legendTitle")
            .style("font-weight","bold")
            .attr("x", svgWidth * 0.75)
            .attr("y", svgHeight * 0.4)
            .text("Legend");

        legend
            .selectAll("g")
            .data(legendLabels)
            .enter()
            .append("rect")
            .attr("width", "30")
            .attr("height", "20")
            .style("fill", function (d) {
                return colors[d];
            })
            .attr("x", svgWidth * 0.75)
            .attr("y", function (d, i) {
                return svgHeight * 0.35 + (legendHeight / 4) * (i + 1);
            });

        legend
            .selectAll("g")
            .data(legendLabels)
            .enter()
            .append("text")
            .attr("x", svgWidth * 0.75 + 35)
            .style("font-size",13)
            .attr("y", function (d, i) {
                return svgHeight * 0.35 + (legendHeight / 4) * (i + 1) + 15;
            })
            .text(function (d) {
                return d;
            });

        var div = d3
            .select("#spider-chart")
            .append("div")
            .attr("class", "spidertip")
            .style("opacity", 0)
            .style("left", 0 + "px")
            .style("top", 0 + "px");

        var selectDiv = d3
            .select("#spider-chart")
            .append("div")
            .attr("class", "selectedspidertip")
            .style("opacity", 0)
            .style("left", 0 + "px")
            .style("top", 0 + "px");

        //categories
        var danceability = 0;
        var acousticness = 0;
        var energy = 0;
        var valence = 0;
        var tempo = 0;

        //sum total of each category
        songData2.forEach(function (file) {
            danceability += file.audioFeatures.danceability;
            acousticness += file.audioFeatures.acousticness;
            energy += file.audioFeatures.energy;
            valence += file.audioFeatures.valence;
            tempo += file.audioFeatures.tempo;
        });

        let lengthScale = d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, (svgHeight - margin.top - margin.bottom) / 2]);
        let tempoScale = d3
            .scaleLinear()
            .domain([0, 200])
            .range([0, (svgHeight - margin.top - margin.bottom) / 2]);
        let radialScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([0, (svgHeight - margin.top - margin.bottom) / 2]);
        let ticks = [20, 40, 60, 80, 100];

        //middle of Spider Chart
        let midPointX =
            (svgWidth - margin.right - margin.left) / 2 + margin.right;
        let midPointY = (svgHeight - margin.top) / 2 + margin.top;

        //Finds length for average songs
        let avgDanceability = lengthScale(danceability / songData2.length);
        let avgAcousticness = lengthScale(acousticness / songData2.length);
        let avgEnergy = lengthScale(energy / songData2.length);
        let avgValence = lengthScale(valence / songData2.length);
        let avgTempo = lengthScale((tempo / songData2.length)/200);

        //put averages in usable array
        let averages = [
            avgDanceability,
            avgAcousticness,
            avgEnergy,
            avgValence,
            avgTempo,
        ];
        console.log(averages);
        let featureNames = [
            "Danceability",
            "Acousticness",
            "Energy",
            "Valence",
            "Tempo",
        ];
        let longest = lengthScale(1);

        //store points and initalize string for polygon data
        var chartPoints = ["", "", "", "", ""];
        var statsPoints = [];
        var statsPoly = "";
        var linePoints = [];

        //Math to find angles and lengths of lines in teh spider chart
        for (let i = 0; i < 5; i++) {
            var angle = i * ((2 * Math.PI) / 5) + Math.PI / 2;
            var totHeight = midPointY - Math.sin(angle) * longest;
            var totWidth = Math.cos(angle) * longest + midPointX;
            var statsHeight = midPointY - Math.sin(angle) * averages[i];
            var statsWidth = Math.cos(angle) * averages[i] + midPointX;
            linePoints.push({ x: totWidth, y: totHeight });
            statsPoints.push({ x: statsWidth, y: statsHeight });
            statsPoly += statsWidth + "," + statsHeight + " ";
            console.log(averages[i])

            for (let j = 1; j <= 5; j++) {
                totHeight = midPointY - Math.sin(angle) * (longest * (j / 5));
                totWidth = Math.cos(angle) * (longest * (j / 5)) + midPointX;
                chartPoints[j - 1] += totWidth + "," + totHeight + " ";
            }
        }

        //tick measures
        ticks.forEach(function (t, index) {
            svg.append("text")
                .attr("x", midPointX + 5)
                .attr("y", midPointY - radialScale(t))
                .text(t.toString())
                .style("font-size", 12);
        });

        //create base of spider chart
        for (let i = 0; i < 5; i++) {
            svg.append("polygon")
                .attr("points", chartPoints[i])
                .attr("fill", "none")
                .attr("stroke", "lightgray")
                .attr("stroke-width", 2)
                .on("mouseover", function(){
                   
                    d3.select(this).attr("stroke", "black")
                })
                .on("mouseout", function(){
                    d3.select(this).attr("stroke", "lightgray")
                })

            //draw axis line
            svg.append("line")
                .attr("x1", midPointX)
                .attr("y1", midPointY)
                .attr("x2", linePoints[i].x)
                .attr("y2", linePoints[i].y)
                .attr("stroke", "black");

            //draw axis label
            svg.append("text")
                .attr("x", function (d) {
                    if (i == 0) {
                        return linePoints[i].x - 30;
                    } else if (i == 1) {
                        return linePoints[i].x - 100;
                    } else if (i == 2) {
                        return linePoints[i].x - 30;
                    } else if (i == 3) {
                        return linePoints[i].x - 30;
                    } else if (i == 4) {
                        return linePoints[i].x + 10;
                    }
                    return linePoints[i].x;
                })
                .attr("y", function (d) {
                    if (i == 0) {
                        return linePoints[i].y - 13;
                    } else if (i == 2) {
                        return linePoints[i].y + 20;
                    } else if (i == 3) {
                        return linePoints[i].y + 20;
                    }
                    return linePoints[i].y + 5;
                })
                .text(featureNames[i]);
        }

        // //add average polygon
        svg.append("polygon")
            .attr("points", statsPoly)
            .attr("fill", "#FFAECF")
            .attr("stroke", "black")
            .attr("opacity", 0.5)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        function mouseover(event, d) {
            div.style("opacity", 0.9);
            div.html(
                // "Your average in top songs are" +
                //     "<br/>" +
                //     "in the  " +
                //     "<br/>" +
                    "<strong>" +
                    Math.round((danceability / songData2.length) * 1000) / 10 +
                    "%" +
                    "</strong>" +
                    " percentile in danceability" +
                    "<br/>" +
                    "<br/>" +
                    "<strong>" +
                    Math.round((acousticness / songData2.length) * 1000) / 10 +
                    "%" +
                    "</strong>" +
                    " percentile in acousticness" +
                    "<br/>" +
                    "<br/>" +
                    "<strong>" +
                    Math.round((valence / songData2.length) * 1000) / 10 +
                    "%" +
                    "</strong>" +
                    " percentile in valence" +
                    "<br/>" +
                    "<br/>" +
                    "<strong>" +
                    Math.round((energy / songData2.length) * 1000) / 10 +
                    "%" +
                    "</strong>" +
                    " percentile in energy" +
                    "<br/>" +
                    "<br/>" +
                    "<strong>" +
                    Math.round(tempoScale(tempo / songData2.length) * 10) / 10 +
                    "%" +
                    "</strong>" +
                    " percentile in tempo"
            )
                .style("left", 0 + "px")
                .style("top", 0 + "px");
        }

        function mouseout() {
            div.style("opacity", 0);
        }

        var selectedSongsPoly = [];
        var selectedSongs = [];

        if (selectedSong != null) {
            selectedSongs.push(selectedSong);
            selectedSongs.forEach(function (song, index) {
                song.adjustedFeatures = [];
                song.adjustedFeatures.push(
                    lengthScale(song.audioFeatures.danceability)
                );
                song.adjustedFeatures.push(
                    lengthScale(song.audioFeatures.acousticness)
                );
                song.adjustedFeatures.push(
                    lengthScale(song.audioFeatures.energy)
                );
                song.adjustedFeatures.push(
                    lengthScale(song.audioFeatures.valence)
                );
                song.adjustedFeatures.push(
                    tempoScale(song.audioFeatures.tempo)
                );

                var poly = "";

                for (var i = 0; i < 5; i++) {
                    var angle = i * ((2 * Math.PI) / 5) + Math.PI / 2;
                    var statsHeight =
                        midPointY - Math.sin(angle) * song.adjustedFeatures[i];
                    var statsWidth =
                        Math.cos(angle) * song.adjustedFeatures[i] + midPointX;

                    poly += statsWidth + "," + statsHeight + " ";
                }
                selectedSongsPoly.push(poly);

                svg.append("polygon")
                    .attr("points", poly)
                    .attr("fill", "#1DB954")
                    .attr("stroke", "black")
                    .attr("opacity", 0.5)
                    .on("mouseover", mouseover2)
                    .on("mouseout", mouseout2);

                function mouseover2(event, d) {
                    selectDiv.transition().duration(200).style("opacity", 0.9);
                    selectDiv
                        .html(
                            // "Your average in top songs are" +
                            //     "<br/>" +
                            //     "in the  " +
                            //     "<br/>" +
                                "<strong>" +
                                Math.round(
                                    (song.audioFeatures.danceability) * 1000
                                ) /
                                    10 +
                                "%" +
                                "</strong>" +
                                " percentile in danceability" +
                                "<br/>" +
                                "<br/>" +
                                "<strong>" +
                                Math.round(
                                    (song.audioFeatures.acousticness) * 1000
                                ) /
                                    10 +
                                "%" +
                                "</strong>" +
                                " percentile in acousticness" +
                                "<br/>" +
                                "<br/>" +
                                "<strong>" +
                                Math.round(
                                    (song.audioFeatures.valence) * 1000
                                ) /
                                    10 +
                                "%" +
                                "</strong>" +
                                " percentile in valence" +
                                "<br/>" +
                                "<br/>" +
                                "<strong>" +
                                Math.round((song.audioFeatures.energy) * 1000) /
                                    10 +
                                "%" +
                                "</strong>" +
                                " percentile in energy" +
                                "<br/>" +
                                "<br/>" +
                                "<strong>" +
                                Math.round(
                                    tempoScale(song.audioFeatures.tempo) * 10
                                ) /
                                    10 +
                                "%" +
                                "</strong>" +
                                " percentile in tempo"
                        )
                        .style("left", 0 + "px")
                        .style("top", 0 + "px");
                }

                function mouseout2() {
                    selectDiv.transition().duration(500).style("opacity", 0);
                }
            });
        }
    };
    useEffect(() => {
        if (isLoaded === false) {
            setIsLoaded(true);
        }
        create();
    });
    return <></>;
};

export default SpiderChart;
