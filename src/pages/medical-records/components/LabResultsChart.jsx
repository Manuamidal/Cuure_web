import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LabResultsChart = ({ labResults }) => {
  const [selectedTest, setSelectedTest] = useState(labResults?.[0]?.testName || '');
  const [chartType, setChartType] = useState('line');

  const selectedTestData = labResults?.find(test => test?.testName === selectedTest);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card p-12 rounded-lg shadow-elevation-3 border border-border">
          <p className="text-sm font-medium text-foreground mb-4">{payload?.[0]?.payload?.date}</p>
          <p className="text-sm text-primary">
            Value: <span className="font-medium">{payload?.[0]?.value} {selectedTestData?.unit}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const isInNormalRange = (value, normalRange) => {
    const [min, max] = normalRange?.split('-')?.map(v => parseFloat(v));
    return value >= min && value <= max;
  };

  return (
    <div className="space-y-20">
      <div className="flex flex-col md:flex-row gap-12 md:items-center md:justify-between">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-8">Select Test</label>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e?.target?.value)}
            className="w-full md:max-w-xs px-12 py-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          >
            {labResults?.map((test) => (
              <option key={test?.testName} value={test?.testName}>
                {test?.testName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            iconName="TrendingUp"
            iconPosition="left"
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            iconPosition="left"
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
        </div>
      </div>
      {selectedTestData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="p-20 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-8 mb-8">
                <Icon name="Activity" size={18} color="var(--color-primary)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Latest Result</span>
              </div>
              <p className="text-2xl font-heading font-semibold text-foreground">
                {selectedTestData?.data?.[selectedTestData?.data?.length - 1]?.value} {selectedTestData?.unit}
              </p>
            </div>

            <div className="p-20 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-8 mb-8">
                <Icon name="Target" size={18} color="var(--color-success)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Normal Range</span>
              </div>
              <p className="text-2xl font-heading font-semibold text-foreground">
                {selectedTestData?.normalRange} {selectedTestData?.unit}
              </p>
            </div>

            <div className="p-20 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-8 mb-8">
                <Icon name="TrendingUp" size={18} color="var(--color-accent)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Status</span>
              </div>
              <div className="flex items-center gap-8">
                {isInNormalRange(selectedTestData?.data?.[selectedTestData?.data?.length - 1]?.value, selectedTestData?.normalRange) ? (
                  <>
                    <Icon name="CheckCircle" size={20} color="var(--color-success)" strokeWidth={2} />
                    <span className="text-lg font-medium text-success">Normal</span>
                  </>
                ) : (
                  <>
                    <Icon name="AlertCircle" size={20} color="var(--color-warning)" strokeWidth={2} />
                    <span className="text-lg font-medium text-warning">Abnormal</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-20 md:p-24 shadow-elevation-2 border border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-20">Trend Analysis</h3>
            <div className="w-full h-80 md:h-96" aria-label={`${selectedTest} Trend Chart`}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={selectedTestData?.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-primary)" 
                      strokeWidth={2}
                      dot={{ fill: 'var(--color-primary)', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={selectedTestData?.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      fill="var(--color-primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg p-20 md:p-24 border border-border">
            <h4 className="text-sm font-medium text-foreground mb-12">Test History</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-12 px-8 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-12 px-8 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-left py-12 px-8 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTestData?.data?.map((entry, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="py-12 px-8 text-sm text-foreground">{entry?.date}</td>
                      <td className="py-12 px-8 text-sm font-medium text-foreground">
                        {entry?.value} {selectedTestData?.unit}
                      </td>
                      <td className="py-12 px-8">
                        {isInNormalRange(entry?.value, selectedTestData?.normalRange) ? (
                          <span className="inline-flex items-center gap-4 px-8 py-4 bg-success/10 text-success rounded-full caption">
                            <Icon name="CheckCircle" size={12} color="currentColor" strokeWidth={2} />
                            Normal
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-4 px-8 py-4 bg-warning/10 text-warning rounded-full caption">
                            <Icon name="AlertCircle" size={12} color="currentColor" strokeWidth={2} />
                            Abnormal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LabResultsChart;