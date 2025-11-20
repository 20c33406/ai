class space {
        constructor(id, smallid, bigid, player, available){
            this.id = id
            this.smallid = smallid
            this.bigid = bigid
            this.player = player
            this.available = available
        }
    }
class Game {

    constructor(){
        this.on = true;
        this.playerX = 1;
        this.playerO = 2;
        this.board = Array(9).fill(null).map(() => Array(9).fill(0));
        this.winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
        let k = 0
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                this.board[i][j] = new space(k,j,i,0,true)
                k++
            }
        }
    }
    




     
    displayBoard = () => {
        console.table(this.board.map(row => row.map(space => space.player)));
    }



    

    getSpaceById = (e) => {
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(this.board[i][j].id == e){
                    
                    return this.board[i][j]
                }
            }
        }
    }

    

    highlightAll = () => {
        for (let j = 0; j < 81; j++) {
            getSpaceById(j).available = true
        }

    }

    clearAll = () => {
        for (let j = 0; j < 81; j++) {
            getSpaceById(j).available = false
        }

    }



    markSquareAsWon = (playerId, big) => {

        for (let i = 0; i < 81; i++) {
            let tspace = getSpaceById(i)
            console.log(big)
            console.log(tspace.bigid)
            if(tspace.bigid == big){
                tspace.player = playerId
            }
        }
        
        thinger.innerHTML = `${playerId} has won a square`; 
        thinger.innerHTML = playerId === this.playerX ? `${this.playerO}'s turn` : `${this.playerX}'s turn`;
        
    };

    highlightAvailableMoves = (id) => {
        clearAll()
        for(let i=0;i<81;i++){
            lastspace = getSpaceById(id)
            newspace = getSpaceById(i)

            if((newspace.player>0) && (lastspace.smallid == newspace.bigid || this.board[lastspace.smallid].every(val => val.player !== 0))){
                newspace.available=true
            }
        }

            

        
    };
    playerHasWon = () => {
        let winIndicator =  this.winningCombos.some(([a, b, c]) => {
            if(this.board[a].every((val, idx) => val.player !== 0 && val.player === this.board[b][idx].player && val.player === this.board[c][idx].player)){
                return(this.board[a][0].player)
            }
        });
        if(winIndicator){
            return winIndicator
        } else if(this.isFilled()) {
            return 0
        }   else {
            return false
        }
    };

    playerHasWonSquare = (num) => {
        let winIndicator= this.winningCombos.some(([a, b, c]) => {
            if(this.board[num][a].player!=0 && this.board[num][a].player === this.board[num][b].player && this.board[num][a].player === this.board[num][c].player){
                return(this.board[num][a].player)
            }
        });
        if(winIndicator){
            return winIndicator
        }   else {
            return false
        }
    };



    isFilled = (num) => {
        return this.board[num].every(val => val.player !== 0);
    };

    chooseSpace = (playerId, tempid) => {


        let tempspace = this.getSpaceById(tempid)
   


        if (tempspace.available) {

            updatePlayerTurn(e);
            tempspace.player = playerId

            if (playerHasWonSquare(tempspace.bigid)) {
                markSquareAsWon(tempspace.bigid);
                if (playerHasWon()!==0) {
                    thinger.innerHTML = `${playerId} has won`;
                    this.on = false;
                }
            }
            highlightAvailableMoves(tempspace.id);
        }
        update();
    }

    get1DArrayFormatted(playerId){
        return this.board.reduce((array, line) => array.concat(
      line.map((cellValue) => {
        if (cellValue.player === 0) return 0;
        else if (cellValue.player === playerId) return 1;
        return -1;
      })
    ), []);
    };

    get1DArrayFiltered(playerId){
    // this function returns the board in a single array with
    // only the playerId chips appearing
    return this.board.reduce((array, line) => array.concat(
      line.map((cellValue) => {
        if (cellValue.player === playerId) return 1;
        else return 0;
      })
    ), []);
  }
    
    getConvolutionalVol(playerId){
    // this function aims to return a 3D array : 6*7*2 for the 2 players' chips
    // The first unit in the depth is the playerId game
    const opponentId = playerId === 1 ? 2 : 1;
    const vol = {
      sx: 9,
      sy: 9,
      depth: 2,
      w: new Float64Array(this.get1DArrayFiltered(playerId).concat(this.get1DArrayFiltered(opponentId))),
      dw: new Float64Array(9 * 9 * 2).fill(0),
    }
    return vol;
  }
}




module.exports.Game = Game;