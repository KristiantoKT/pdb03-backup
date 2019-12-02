import React, { Component } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";

class BoroughChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          borough: []
        }
    }
    
    getTotalNumberOfBorough = async () => {
        const query = {
            "aggs": {
                "borough_numbers": {
                    "terms": {
                        "field": "BOROUGH.keyword"
                    }
                }
            }
        };
        
        const response = await axios.get('http://35.193.23.202:9200/accident/_search', {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        });

        this.setState({
            borough: response.data.aggregations.borough_numbers.buckets
        });
        
        // Change "" to UNDEFINED
        for(let i = 0; i < this.state.borough.length; i++) {
            if(this.state.borough[i].key === "") {
                this.state.borough[i].key = "UNDEFINED";
            }
        }
    }
    
    componentDidMount() {
		this.getTotalNumberOfBorough();
	}
    
    render() {
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#BB2233', "#12BB31", "#489ABC"];
        
        // Change "" to UNDEFINED
        for(let i = 0; i < this.state.borough.length; i++) {
            if(this.state.borough[i].key === "") {
                this.state.borough[i].key = "UNDEFINED";
            }
        }
        return (
            <div>
                <PieChart width={730} height={250}>
                    <Pie data={this.state.borough} dataKey="doc_count" nameKey="key" cx="50%" cy="50%" fill="#ff0000" label labelLine isAnimationActive={false}>
                    {
                        this.state.borough.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                    }
                    </Pie>
                    <Legend verticalAlign="top" height={36} />
                </PieChart>
            </div>
        );
    }
}

export default BoroughChart;