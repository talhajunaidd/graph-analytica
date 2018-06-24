import {Injectable, OnInit} from '@angular/core';
import * as jsnx from 'jsnetworkx';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GraphService implements OnInit {
    private graphs = new BehaviorSubject<any>({});
    graph = this.graphs.asObservable();

    constructor() {
        const data = {
            'n0': [
                'n1'
            ],
            'n1': [
                'n0',
            ]
        };
        this.fromDictOfLists(data);

    }

    /*getGraph(): jsnx.classes.Graph {
        return this.graph;
    }*/

    fromDictOfLists(graphAsDictOfList: any) {
        const graph = jsnx.fromDictOfLists(graphAsDictOfList);
        this.graphs.next(graph);
    }

    ngOnInit(): void {

    }

    onAddNode(var1, var2, var3, var4) {
        console.log('changed');
    }


}
