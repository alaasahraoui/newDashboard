import React, { useState, useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import actions from '../ConfigFiles/actions';
import strategies from '../ConfigFiles/strategies';

const FormComponent = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  // useMemo to filter actions based on the selected strategy, optimizing re-renders
  const filteredActions = useMemo(() => actions.filter(action => 
    action.strategyId === parseInt(selectedStrategy, 10)), [actions, selectedStrategy]);

  const handleStrategyChange = (e) => {
    setSelectedStrategy(e.target.value);
    setSelectedAction(''); // Reset selected action when strategy changes
  };

  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="strategy-select-label">Strategy</InputLabel>
        <Select
          labelId="strategy-select-label"
          id="strategy-select"
          value={selectedStrategy}
          onChange={handleStrategyChange}
          displayEmpty
        >
          
          {strategies.map((strategy) => (
            <MenuItem key={strategy.strategy_id} value={strategy.strategy_id.toString()}>
              {strategy.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render action dropdown only if a strategy is selected */}
      {selectedStrategy && (
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="action-select-label">Action</InputLabel>
          <Select
            labelId="action-select-label"
            id="action-select"
            value={selectedAction}
            onChange={handleActionChange}
            displayEmpty
          >
            
            {filteredActions.map((action) => (
              <MenuItem key={action.actionId} value={action.actionId.toString()}>
                {action.actionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default FormComponent;
