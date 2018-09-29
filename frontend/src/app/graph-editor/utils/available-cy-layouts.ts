interface CyLayout {
    id: string;
    name: string;
}

const AvailableCyLayouts: CyLayout[] = [
    {id: 'random', name: 'Random'},
    {id: 'preset', name: 'Preset'},
    {id: 'grid', name: 'Grid'},
    {id: 'circle', name: 'Circle'},
    {id: 'concentric', name: 'Concentric'},
    {id: 'breadthfirst', name: 'Breadthfirst'},
    {id: 'cose', name: 'CoSE'},
    {id: 'dagre', name: 'Dagre'},
    {id: 'spread', name: 'Spread'},


];
export {AvailableCyLayouts, CyLayout};
