### What is The Graph?

The Graph makes fetching data of the blockchain efficient and easy using a decentralized protocol that indexes and fetches the data on need. 
So that when we query a specific data, instead of scanning the whole data stored on the blockchain, The Graph will scan only the indexes of that data. It's like Google of the blockchain.

![[Pasted image 20220106112633.png]]

1. A **dApp** adds data to the blockchain through a transaction on a smart contract.
2. The smart contract a `receipt` or `block` event while processing the transaction.
3. **Graph Node** continually scans the NEAR network for those events.
4. When the Graph Node picks an event it will index that data made in that transaction if it's setup to do so
5. User queries and fetches data using the **GraphQL API** 



##### What is a Subgraph?
Basically, a **subgraph** is a set of files that defines what network and contracts to listen to and which data to index, and how to store that data. 
After the **subgraph** is built and deployed to a **Graph Node**, it will start watching the **NEAR network** for **Block** and **Receipt** events which may trigger the indexing of transaction data depending on the **subgraph** deployed.

##### What is a Graph Node?
A **Graph Node** is an application that processes the entire blockchain and allows subgraphs to be registered on it to update a data store that can be queried via the GraphQL endpoint.


##### Building a Subgraph
A subgraph is built on three aspects:


**[subgraph.yaml](https://thegraph.com/docs/en/developer/create-subgraph-hosted/#the-subgraph-manifest):** The subgraph manifest specifies all the information required to index and query a specific contract. This is the entry point to the subgraph, and some of the info it contains are:
- The metadata of the subgraph
- The blockchain kind (`near`) and network we're indexing from (`near-testnet` or `near-mainnet`)
- The source of data (`contract account`) and the block to start watching from
- The name of the function that handles `Block` and `Receipt` events
- A list of entities defined in `schema.graphl`


**[schema.graphql](https://thegraph.com/docs/en/developer/create-subgraph-hosted/#the-graph-ql-schema)':** a schema file that defines what data is stored for your subgraph, and how to query it via GraphQL. Data here is defined as `entities` which is similar to typescript types but with much more features.


**[The indexing logic](https://thegraph.com/docs/en/developer/create-subgraph-hosted/#writing-mappings):** A set of functions written in AssemblyScript that tells the subgraph how to process the event data and how to write it into  `entities` that can be stored in The Graph data store


> For more specification visit **[thegraph docs](https://thegraph.com/docs/en/developer/create-subgraph-hosted/#the-subgraph-manifest):**
