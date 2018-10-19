const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const bodyParser = require('body-parser');
/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.app.use(bodyParser.json());
        this.getBlockByIndex();
        this.postNewBlock();

    }


    

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", (req, res) => {
            res.send(JSON.stringify(this.blocks[req.params.index]).toString());
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        
        this.app.post("/api/block", (req, res) => {

            var data = req.body.data.toString();
            let blockAux = new BlockClass.Block(data);
            blockAux.height = this.blocks.length + 1;
            this.blocks.push(blockAux);


            res.setHeader('Content-Type', 'text/plain')
            res.write('you posted:\n')
            res.end(JSON.stringify(blockAux).toString());
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}