import React, { Component } from "react";
import { BarChart, Tooltip, XAxis, YAxis, Bar } from "recharts";
import axios from "axios";

class ContributingFactorChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          contributing_factor: []
        }
    }

    getContributingFactor = async () => {
        const query = {
            "aggs": {
                "cont_vc_1": {
                    "terms": {
                        "field": "CONTRIBUTING FACTOR VEHICLE 1.keyword"
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
            contributing_factor: response.data.aggregations.cont_vc_1.buckets.slice(0,5)
        });
        console.log(this.state.contributing_factor);
    }

    componentDidMount() {
        this.getContributingFactor();
    }

    render() {
        return(
            <div>
                <BarChart width={500} height={250} data={this.state.contributing_factor}>
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="doc_count" isAnimationActive={false} fill="#444e86"></Bar>
                </BarChart>

            </div>
        );
    }
}

export default ContributingFactorChart;