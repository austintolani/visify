import React, {useEffect ,useState} from 'react';
import * as d3 from "d3";

const DetailedChart = ({songData, selectedSong}) => {



const [isLoaded, setIsLoaded] = useState(false);

var danceabilityStats = []
var acousticnessStats = []
var tempoStats = []
var valenceStats = []
var energyStats = []
songData.forEach(function(song){
    danceabilityStats.push(song.audioFeatures.danceability)
    acousticnessStats.push(song.audioFeatures.acousticness)
    tempoStats.push(song.audioFeatures.tempo)
    valenceStats.push(song.audioFeatures.valence)
    energyStats.push(song.audioFeatures.energy)
})

danceabilityStats.sort((a,b)=> b-a)
acousticnessStats.sort((a,b)=>b-a)
tempoStats.sort((a,b)=> b-a)
valenceStats.sort((a,b)=> b-a)
energyStats.sort((a,b)=> b-a)

    const create = ()=>{
//resource https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

d3.select("#selectedDetails").remove()

//let self2 = this
let margin = { top: 10, right: 2, bottom: 30, left: 2 };

var detailVis = d3.select("#circlesVis");



let svgWidth = d3.select("#song-vis-wrapper").node().getBoundingClientRect().width;
let svgHeight = 150;


//creates svg element within the div
var svg = detailVis.append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id", "selectedDetails")

var statPercents = []
statPercents.push(100 - ((danceabilityStats.indexOf(selectedSong.audioFeatures.danceability))/40)*100)
statPercents.push(100 -((acousticnessStats.indexOf(selectedSong.audioFeatures.acousticness))/40)*100)
statPercents.push(100 -((valenceStats.indexOf(selectedSong.audioFeatures.valence)+1)/40)*100)
statPercents.push(100 -((energyStats.indexOf(selectedSong.audioFeatures.energy)+1)/40)*100)
statPercents.push(100 -((tempoStats.indexOf(selectedSong.audioFeatures.tempo)+1)/40)*100)

var rankings = []
rankings.push(danceabilityStats.indexOf(selectedSong.audioFeatures.danceability)+1)
rankings.push(acousticnessStats.indexOf(selectedSong.audioFeatures.acousticness)+1)
rankings.push(valenceStats.indexOf(selectedSong.audioFeatures.valence)+1)
rankings.push(energyStats.indexOf(selectedSong.audioFeatures.energy)+1)
rankings.push(tempoStats.indexOf(selectedSong.audioFeatures.tempo)+1)

var categories = ["Danceability", "Acousticness", "Valence", "Energy", "Tempo"]

svg.append("text")
    .attr("x", svgWidth/2)
    .attr("y", 15)
    .style("font-size", 20)
    .style("text-anchor", "middle")
    .text(`Here is how "${selectedSong.name}" ranked among your top songs:`);

var group1 = svg.append("g")
    .attr("transform", "translate(0,80)")

group1.selectAll("rect")
        .data(statPercents)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return svgWidth/5 * i+11
        })
        .attr("y", 2)
        .attr("height", 50)
        .attr("width", function(d){
            return svgWidth/5 - 20
        })
        .attr("stroke", "black")
        .attr("fill", "none")

        var group2 = svg.append("g")
        .attr("transform", "translate(0,80)")

    var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);
    
    group2.selectAll("rect")
            .data(statPercents)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return svgWidth/5 * i+11
            })
            .attr("y", 2)
            .attr("height", 50)
            .attr("stroke", "black")
            .attr("fill", "pink")
            .transition(t)
            .attr("width", function(d){
                return (svgWidth/5 - 20)*(d/100)
            })

            var group3 = svg.append("g")
            .attr("transform", "translate(0,75)")
        
        group3.selectAll("text")
                .data(rankings)
                .enter()
                .append("text")
                .attr("x", function(d,i){
                    return svgWidth/5 * i+svgWidth/10
                })
                .attr("y", 0)
                .text(function(d){
                    return "#"+ d
                })
                .style("font-size", 20)
                .style("text-anchor", "middle")

                var group4 = svg.append("g")
                .attr("transform", "translate(0,50)")
            
            group4.selectAll("text")
                    .data(categories)
                    .enter()
                    .append("text")
                    .attr("x", function(d,i){
                        return svgWidth/5 * i+1+svgWidth/10
                    })
                    .attr("y", 0)
                    .text(function(d){
                        return d
                    })
                    .style("font-size", 15)
                    .style("text-anchor", "middle")
                



        



//categories

    }

    useEffect(()=>{
        if(isLoaded===false){      
            setIsLoaded(true);
        }
        create();
       
    })
    return ( <></>);
}
 
export default DetailedChart;