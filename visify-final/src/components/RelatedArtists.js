import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const RelatedArtistChart = ({
    artistData,
    selectedArtist,
    setSelectedArtist,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    var artistNames = [];
    artistData.forEach(function (d) {
        artistNames.push(d.name);
    });
    const create = () => {
        //resource https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8

        var margin = { top: 10, right: 20, bottom: 30, left: 50 };

        //Gets access to the div element created for this chart from HTML

        var svgWidth = d3
        .select("#artist-chart")
        .node()
        .getBoundingClientRect().width;
        var svgHeight = 500;

        var forceVis = d3.select("#artist-chart");
        let myColor = d3.scaleSequential()
        .domain([0,30])
        .interpolator(d3.interpolateSpectral);
       
        //creates svg element within the div
        var svg = forceVis
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("id", "forceSVG");

        var nodes = [];
        var links = [];
        var artistNames = [];
        var cluster = [];
        var clusterTrack = 0;
        console.log(artistData)
        artistData.forEach(function (artist) {
            nodes.push({ name: artist.name });
            artistNames.push(artist.name);
        });

        artistData.forEach(function (artist, index) {
            clusterTrack += 1;
            var noLinks = true

            console.log(artist.name)
            artist.relatedArtists.forEach(function (person) {
                var target = artistNames.indexOf(person.name);
                if (target != -1 && cluster[target] != null) {
                    console.log(person.name)
                    noLinks=false
                    if (cluster[index] == null) {
    
                        if(cluster[target] == null){
                            
                            console.log(artistData.filter(artist =>{
                                return artist.name === person.name
                            }))
                            cluster[index] = clusterTrack;
                            cluster[target] = clusterTrack;
                        }
                        else{
                            
                            cluster[index] = cluster[target]
                        }
                    }
                    else{

                        cluster[target] = cluster[index];
                    }
                    links.push({ source: index, target: target });
                } 
            
            });
            artist.relatedArtists.forEach(function (person) {
                var target = artistNames.indexOf(person.name);
                if (target != -1) {
                    console.log(person.name)
                    noLinks=false
                    if (cluster[index] == null) {
    
                        if(cluster[target] == null){
                            
                            console.log(artistData.filter(artist =>{
                                return artist.name === person.name
                            }))
                            cluster[index] = clusterTrack;
                            cluster[target] = clusterTrack;
                        }
                        else{
                            
                            cluster[index] = cluster[target]
                        }
                    }
                    else{

                        cluster[target] = cluster[index];
                    }
                    links.push({ source: index, target: target });
                } 
            
            });
            if(noLinks && cluster[index] == null){
                cluster[index] = clusterTrack;
            }
            console.log(cluster)
        });
        let clusterUnique = [...new Set(cluster)];
        // console.log(clusterUnique);
        // let myColor = d3.scaleOrdinal(d3.schemeSpectral[clusterUnique.length])
        // .domain(clusterUnique)

        // .interpolator(d3.interpolateSpectral);
        let data = { nodes, links };

        var force;

        force = d3
            .forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(data.links).distance(95))
            .force(
                "center",
                d3
                    .forceCenter()
                    .x(svgWidth / 2)
                    .y(svgHeight / 2)
            );
        // 2a) DEFINE 'NODES' AND 'EDGES'

        //Create edges as lines
        var edges = svg
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);
        //Create nodes as circles
        var nodes = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")
            .on("click", clicked);

        var circle = nodes
            .append("circle")
            .attr("r", 30)
            .attr("fill", function(d,i){
                // console.log(d,cluster[i])
                return myColor(cluster[i])
            })
            .attr("class", "unselectedArtist")

        var labels = nodes
            .append("text")
            .text(function (d) {
                if (d.name.length < 12){
                    return d.name;
                }
                else{
                    return `${d.name.slice(0,10)}..`;
                }
            })
            .attr("x", 0)
            .attr("y", 2)
            .style("font-size", 10)
            .style("text-anchor", "middle")
            .style("font-weight", "bold");

        var test;
        // 5) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS
        force.on("tick", () => {
            nodes.attr("transform", function (d) {
                var tempx = Math.max(35, Math.min(svgWidth - 35, d.x));
                var tempy = Math.max(35, Math.min(svgHeight - 35, d.y));
                return "translate(" + tempx + "," + tempy + ")";
            });
            edges
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

        });

        const dragstart = (event, d) => {
            if (!event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        function drag(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragend(event, d) {
            if (!event.active) force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        function clicked(event, d) {
            if (event.defaultPrevented) return;
            console.log(d);
            var temp = artistNames.indexOf(d.name);
            console.log(temp);
            setSelectedArtist(artistData[temp]);
            //this.attr("class")
            console.log("---");
            console.log(selectedArtist);
        }

        nodes.call(
            d3
                .drag()
                .on("start", (event, d) => dragstart(event, d))
                .on("drag", (event, d) => drag(event, d))
                .on("end", (event, d) => dragend(event, d))
        );

        nodes.append("title").text(function (d) {
            
            return d.name;
        });
    };

    const highlight = () => {
        var svg = d3.select("#artist-chart").select("#forceSVG");

        if (selectedArtist != null) {
            svg.selectAll("circle").each(function (d, i) {
                if (d.name == selectedArtist.name) {
                    d3.select(this).attr("class", "selectedArtist");
                } else {
                    d3.select(this).attr("class", "unselectedArtist");
                }
            });
        }
        return "crimson";
    };
    useEffect(() => {
        if (isLoaded === false) {
            create();
            setIsLoaded(true);
        }
        highlight();
    });
    return <></>;
};

export default RelatedArtistChart;
