import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const API_URL = 'https://canopy-frontend-task.now.sh/api/holdings';

const TableData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setData(response.data.payload);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupedHoldings = data.reduce((acc, holding) => {
    if (!acc[holding.asset_class]) {
      acc[holding.asset_class] = [];
    }
    acc[holding.asset_class].push(holding);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedHoldings).map(([assetClass, data], index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ArrowRightIcon />} >
            {assetClass}
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Asset Class</TableCell>
                    <TableCell>Avg. Price</TableCell>
                    <TableCell>Market Price</TableCell>
                    <TableCell>Latest Change (%)</TableCell>
                    <TableCell>Market Value (Base CCY)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((dataHolding, index) => (
                    <TableRow key={index}>
                      <TableCell>{dataHolding.name}</TableCell>
                      <TableCell>{dataHolding.ticker}</TableCell>
                      <TableCell>{dataHolding.asset_class}</TableCell>
                      <TableCell>{dataHolding.avg_price}</TableCell>
                      <TableCell>{dataHolding.market_price}</TableCell>
                      <TableCell>{dataHolding.latest_chg_pct}</TableCell>
                      <TableCell>{dataHolding.market_value_ccy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default TableData;
