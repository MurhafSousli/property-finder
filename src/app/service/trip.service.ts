import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Result, Trip, TripForm } from '../trip/trip';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class TripService {

  search$ = new Subject();
  result$ = new Subject();

  constructor(private http: Http) {

    this.search$
      .switchMap((args: TripForm) => {
        return this.http.get('assets/response.json')
          .map(res => this.result$.next(this.pathFinder(<Result>res.json())));
      })
      .subscribe();
  }

  search(args: TripForm) {
    console.log('[Search]', args);
    this.search$.next(args);
  }

  /** TODO:
   * Create a graph out of the available deals
   * Complete the path finding */
  pathFinder(data: Result) {

    const graph: Dijkstra = new Dijkstra();

    const cities = [];

    // Transform deals into a graph

    data.deals.map((deal) => {

      const departure = deal.departure;
      const arrival = [];
      // console.log(i, deal);

      arrival.push({departure: deal.departure, arrival: deal.arrival});

      if (!contains(cities, deal.departure)) {
        console.log(deal.departure);
        cities.push(deal.departure);
      }

    });

    cities.map(city => {
      // graph.addVertex(city, {B: 7, C: 8});
    });

    // console.log(graph.shortestPath('A', 'F'));

    return data;
  }

  getCostAfterDiscount(deal: Trip) {
    return (deal.discount) ? (deal.cost * deal.discount / 100) : deal.cost;
  }


}


/**
 * A node for priorioty linked list / stack and such
 */
class PriorityNode {
  key: number;
  priority: number;

  constructor(key: number, priority: number) {
    this.key = key;
    this.priority = priority;
  }
}

/**
 * A priority queue with highest priority always on top
 * This queue is sorted by priority for each enqueue
 */
class PriorityQueue {

  nodes: PriorityNode[] = [];

  /**
   * Enqueue a new node
   * @param {[type]} priority
   * @param {[type]} key
   */
  enqueue(priority: number, key: number) {
    this.nodes.push(new PriorityNode(key, priority));
    this.nodes.sort(
      function (a, b) {
        return a.priority - b.priority;
      }
    );
  }

  /**
   * Dequeue the highest priority key
   */
  dequeue(): number {
    return this.nodes.shift().key;
  }

  /**
   * Checks if empty
   */
  empty(): boolean {
    return !this.nodes.length;
  }
}

/**
 * Computes the shortest path between two node
 */
class Dijkstra {

  infinity = 1 / 0;
  vertices = {};

  /**
   * Add a new vertex and related edges
   * @param {[type]} name  [description]
   * @param {[type]} edges [description]
   */
  addVertex(name: string, edges: any) {
    this.vertices[name] = edges;
  }

  /**
   * Computes the shortest path from start to finish
   * @param {[type]} start  [description]
   * @param {[type]} finish [description]
   */
  shortestPath(start: string, finish: string) {

    let nodes = new PriorityQueue(),
      distances = {},
      previous = {},
      path = [],
      smallest,
      vertex,
      neighbor,
      alt;

    // Init the distances and queues variables
    for (vertex in this.vertices) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = this.infinity;
        nodes.enqueue(this.infinity, vertex);
      }

      previous[vertex] = null;
    }

    // continue as long as the queue haven't been emptied.
    while (!nodes.empty()) {


      smallest = nodes.dequeue();

      // we are the last node
      if (smallest === finish) {

        // Compute the path
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      // No distance known. Skip.
      if (!smallest || distances[smallest] === this.infinity) {
        continue;
      }

      // Compute the distance for each neighbor
      for (neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(alt, neighbor);
        }
      }
    }
    // the starting point isn't in the solution &  the solution is from end to start.
    return path.concat(start).reverse();
  }
}

function contains(arr, element) {
  return arr.indexOf(element) > -1;
}

// export module PathFinder {
//
//   export function searchPath(data: Result, start: string, end: string): Trip[] {
//
//     const debugStartTime = performance.now();
//
//     /** Path validation */
//     if (start === end) {
//       console.log('From and To must be different');
//       return null;
//     }
//
//     /** Start A* Algorithm */
//     const openList = new List<Trip>();
//     const closedList = new List<Trip>();
//
//     let currentTrip: Trip;
//
//     /** While openList is not empty */
//     while (openList.length) {
//       // current node = node for open list with the lowest cost.
//       currentTrip = getTripWithLowestTotal(openList);
//
//       // if the currentTrip is the end (dest), then we can stop searching
//       if (currentTrip.arrival === end) {
//
//         const debugEndTime = performance.now();
//
//         console.log(`Path found in ${(debugEndTime - debugStartTime).toFixed(3)}ms`);
//
//         return shortestPath(data, start, end, openList, closedList);
//
//       } else {
//         // move the current tile to the closed list and remove it from the open list.
//         openList.remove(currentTrip);
//         closedList.push(currentTrip);
//
//         // Get all adjacent Tiles
//         const adjacentTiles = getAdjacentTiles(data, currentTrip);
//
//         for (const adjacentTile of adjacentTiles) {
//           // Get tile is not in the open list
//           if (!openList.contains(adjacentTile)) {
//             // Get tile is not in the closed list
//             if (!closedList.contains(adjacentTile)) {
//               // move it to the open list and calculate cost
//               openList.push(adjacentTile);
//
//               // calculate the cost
//               adjacentTile.search.cost = currentTrip.search.cost + 1;
//               // calculate the manhattan distance
//               adjacentTile.search.heuristic = manhattanDistance(adjacentTile, end);
//               // calculate the total amount
//               adjacentTile.search.total = adjacentTile.search.cost + adjacentTile.search.heuristic;
//
//             }
//           }
//         }
//       }
//     }
//   }
//
//   function getTripWithLowestTotal(openList: Trip[]): Trip {
//
//     let tripWithLowestTotal: Trip = {};
//     let lowestTotal = 999999999;
//     /** Search open tiles and get the tile with the lowest total cost */
//     for (const openTile of openList) {
//       if (openTile.search.total <= lowestTotal) {
//
//         lowestTotal = openTile.search.total;
//         tripWithLowestTotal = openTile;
//       }
//     }
//     return tripWithLowestTotal;
//   }
//
//   function getAdjacentTiles(data: Result, current: Trip): Trip[] {
//     const adjacentTiles: Trip[] = [];
//     let adjacentTile: Trip;
//
//     // Trip to left
//     if (current.index.x - 1 >= 0) {
//       adjacentTile = game.grid[current.index.x - 1][current.index.y];
//       if (adjacentTile) {
//         adjacentTiles.push(adjacentTile);
//       }
//     }
//
//     // Trip to right
//     if (current.index.x + 1 < game.width) {
//       adjacentTile = game.grid[current.index.x + 1][current.index.y];
//       if (adjacentTile) {
//         adjacentTiles.push(adjacentTile);
//       }
//     }
//
//     // Trip to Under
//     if (current.index.y + 1 < game.height) {
//       adjacentTile = game.grid[current.index.x][current.index.y + 1];
//       if (adjacentTile) {
//         adjacentTiles.push(adjacentTile);
//       }
//     }
//
//     // Trip to Above
//     if (current.index.y - 1 >= 0) {
//       adjacentTile = game.grid[current.index.x][current.index.y - 1];
//       if (adjacentTile) {
//         adjacentTiles.push(adjacentTile);
//       }
//     }
//     return adjacentTiles;
//   }
//
//   /** Calculate the manhattan distance */
//   function manhattanDistance(adjacentTile: Trip, endTile: Trip): number {
//
//     return Math.abs(endTile.cost - adjacentTile.cost);
//   }
//
//   function shortestPath(data: Result, startTrip: Trip, endTrip: Trip, openList: List<Trip>, closedList: List<Trip>): Trip[] {
//     const startFound = false;
//     let currentTrip = endTrip;
//     const pathTiles = [];
//
//     // includes the end tile in the path
//     pathTiles.push(endTrip);
//
//     while (!startFound) {
//       const adjacentTrips = getAdjacentTiles(data, currentTrip);
//       // check to see what newest current tile.
//       for (const adjacentTrip of adjacentTrips) {
//         // check if it is the start tile
//         if (adjacentTrip === startTrip) {
//           return pathTiles;
//         }
//
//         // It has to be inside the closedList or openList
//         if (closedList.contains(adjacentTrip) || openList.contains(adjacentTrip)) {
//           if (adjacentTrip.cost <= currentTrip.search.cost && adjacentTrip.search.cost > 0) {
//             // Change the current tile.
//             currentTrip = adjacentTrip;
//             // Add this adjacentTile to the path list
//             pathTiles.push(adjacentTrip);
//             break;
//           }
//         }
//       }
//     }
//   }
// }

// export class List<T> extends Array<T> {
//
//   remove(item) {
//     const index = this.indexOf(item);
//     if (index !== -1) {
//       return this.splice(index, 1);
//     }
//   }
//
//   contains(item): boolean {
//     return this.indexOf(item) !== -1;
//   }
// }
