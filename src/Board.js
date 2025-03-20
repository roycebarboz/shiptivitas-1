import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => client.status === 'backlog'),
        inProgress: clients.filter(client => client.status === 'in-progress'),
        complete: clients.filter(client => client.status === 'complete'),
      }
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
  }

  componentDidMount() {
    // Reset all tasks to the "backlog" swimlane
    const allClients = this.getClients().map(client => ({ ...client, status: 'backlog' }));
    this.setState({
      clients: {
        backlog: allClients,
        inProgress: [],
        complete: [],
      },
    });

    // Initialize Dragula with options to prevent DOM conflicts
    const drake = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ], {
      removeOnSpill: false,
      copy: false
    });

    // Keep track of a card being dragged
    let draggedItem = null;

    drake.on('drag', (el) => {
      // Store reference to the dragged item
      draggedItem = el;
    });

    drake.on('dragend', () => {
      // Clear reference when drag ends
      draggedItem = null;
    });

    drake.on('drop', (el, target, source) => {
      // Get required data for state update
      const cardId = el.getAttribute('data-id');
      const targetLane = target.getAttribute('data-lane');
      const sourceLane = source.getAttribute('data-lane');
      
      // Only update if moved to a different lane
      if (sourceLane !== targetLane) {
        // Create a copy of the current state
        const updatedClients = { ...this.state.clients };
        
        // Find the client in the source lane
        const clientIndex = updatedClients[sourceLane].findIndex(client => client.id === cardId);
        if (clientIndex === -1) return;
        
        // Get the client and update its status
        const movedClient = { ...updatedClients[sourceLane][clientIndex] };
        movedClient.status = targetLane === 'inProgress' ? 'in-progress' : targetLane;
        
        // Remove from source lane
        updatedClients[sourceLane] = updatedClients[sourceLane].filter(client => client.id !== cardId);
        
        // Add to target lane
        updatedClients[targetLane] = [...updatedClients[targetLane], movedClient];
        
        // Cancel Dragula's DOM manipulation and let React handle it
        drake.cancel(true);
        
        // Update state - this will trigger React to re-render the proper DOM
        this.setState({ clients: updatedClients });
      }
    });

    // Save drake instance for potential cleanup
    this.drake = drake;
  }

  // Add componentWillUnmount to clean up
  componentWillUnmount() {
    if (this.drake) {
      this.drake.destroy();
    }
  }

  getClients() {
    return [
      ['1', 'Stark, White and Abbott', 'Cloned Optimal Architecture', 'in-progress'],
      ['2', 'Wiza LLC', 'Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3', 'Nolan LLC', 'Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4', 'Thompson PLC', 'Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5', 'Walker-Williamson', 'Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6', 'Boehm and Sons', 'Automated Systematic Paradigm', 'backlog'],
      ['7', 'Runolfsson, Hegmann and Block', 'Integrated Transitional Strategy', 'backlog'],
      ['8', 'Schumm-Labadie', 'Operative Heuristic Challenge', 'backlog'],
      ['9', 'Kohler Group', 'Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10', 'Romaguera Inc', 'Managed Foreground Toolset', 'backlog'],
      ['11', 'Reilly-King', 'Future-Proofed Interactive Toolset', 'complete'],
      ['12', 'Emard, Champlin and Runolfsdottir', 'Devolved Needs-Based Capability', 'backlog'],
      ['13', 'Fritsch, Cronin and Wolff', 'Open-Source 3Rdgeneration Website', 'complete'],
      ['14', 'Borer LLC', 'Profit-Focused Incremental Orchestration', 'backlog'],
      ['15', 'Emmerich-Ankunding', 'User-Centric Stable Extranet', 'in-progress'],
      ['16', 'Willms-Abbott', 'Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17', 'Brekke PLC', 'Intuitive User-Facing Customerloyalty', 'complete'],
      ['18', 'Bins, Toy and Klocko', 'Integrated Assymetric Software', 'backlog'],
      ['19', 'Hodkiewicz-Hayes', 'Programmable Systematic Securedline', 'backlog'],
      ['20', 'Murphy, Lang and Ferry', 'Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  // In Board.js
renderSwimlane(name, lane, clients, ref) {
  return (
    <Swimlane
      name={name}
      lane={lane}  // Pass the lane identifier here
      clients={clients}
      dragulaRef={ref}
      className="Swimlane-column"
    />
  );
}

render() {
  return (
    <div className="Board">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {this.renderSwimlane('Backlog', 'backlog', this.state.clients.backlog, this.swimlanes.backlog)}
          </div>
          <div className="col-md-4">
            {this.renderSwimlane('In Progress', 'inProgress', this.state.clients.inProgress, this.swimlanes.inProgress)}
          </div>
          <div className="col-md-4">
            {this.renderSwimlane('Complete', 'complete', this.state.clients.complete, this.swimlanes.complete)}
          </div>
        </div>
      </div>
    </div>
  );
}

}