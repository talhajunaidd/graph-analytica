import {AfterViewInit, ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GraphService} from '../../_services/graph.service';


/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
    children: FileNode[];
    filename: string;
    type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
    constructor(
        public expandable: boolean, public filename: string, public level: number, public type: any) {
    }
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = JSON.stringify({
    x: {
        interaction1: null,
        interaction2: null
    },
    y: {
        interaction1: null,
        interaction2: null
    },
});

@Injectable()
export class FileDatabase {
    dataChange = new BehaviorSubject<FileNode[]>([]);

    get data(): FileNode[] {
        return this.dataChange.value;
    }

    constructor() {
        this.initialize();
    }

    initialize() {
        // Parse the string to json object.
        const dataObject = JSON.parse(TREE_DATA);

        // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
        //     file node as children.
        const data = this.buildFileTree(dataObject, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    buildFileTree(obj: object, level: number): FileNode[] {
        return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new FileNode();
            node.filename = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.type = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }
}

@Component({
    selector: 'app-state-graph',
    templateUrl: './state-graph.component.html',
    styleUrls: ['./state-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateGraphComponent implements OnInit, AfterViewInit {
    treeControl: FlatTreeControl<FileFlatNode>;
    treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
    dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

    constructor(database: FileDatabase, private graphService: GraphService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
            this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        database.dataChange.subscribe(data => this.dataSource.data = data);
    }

    ngOnInit() {
    }


    transformer = (node: FileNode, level: number) => {
        return new FileFlatNode(!!node.children, node.filename, level, node.type);
    };

    private _getLevel = (node: FileFlatNode) => node.level;

    private _isExpandable = (node: FileFlatNode) => node.expandable;

    private _getChildren = (node: FileNode): Observable<FileNode[]> => of(node.children);

    hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;
    hasNoContent = (_: number, _nodeData) => _nodeData.item === '';

    ngAfterViewInit(): void {
        let data = {
            'directed': true,
            'multigraph': false,
            'graph': {},
            'nodes': [
                {
                    'id': '00'
                },
                {
                    'id': '01'
                },
                {
                    'id': '10'
                },
                {
                    'id': '11'
                },
                {
                    'id': '20'
                },
                {
                    'id': '21'
                }
            ],
            'links': [
                {
                    'source': '00',
                    'target': '10'
                },
                {
                    'source': '01',
                    'target': '00'
                },
                {
                    'source': '10',
                    'target': '20'
                },
                {
                    'source': '10',
                    'target': '11'
                },
                {
                    'source': '11',
                    'target': '01'
                },
                {
                    'source': '20',
                    'target': '21'
                }
            ]
        };
        this.graphService.importNodeLinkData(data);
    }

}
