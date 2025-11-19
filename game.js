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
        this.O_TEXT = 'O';
        this.X_TEXT = 'X';
        this.currentPlayer = this.X_TEXT;
        this.bot = this.O_TEXT
        this.player = this.X_TEXT
        this.board = Array(9).fill(null).map(() => Array(9).fill(null));
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
                this.board[i][j] = new space(k,j,i,null,true)
                k++
            }
        }
    }
    




     
    displayBoard = () => {
        console.log(this.board.map(row => row.map(space => space.player)));
    }


    fillArray = () => {
        let k = 0
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                this.board[i][j] = new space(k,j,i,null,true)
                k++
            }
        }
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

    startGame = () => {
        boxes.forEach(box => box.addEventListener('click', boxClicked));
        restartBtn.addEventListener('click', restart);
        restartBtn.removeEventListener('click', startGame);
        this.on = true;
        lastid = null;
        this.board = Array(9).fill(null).map(() => Array(9).fill(null));
        fillArray();
        thinger.innerHTML = 'Noughts and Crosses';
        this.currentPlayer = this.X_TEXT;
        update();
    };

    
    
    botChoose = () => {
        let gameState = this.board
        
    }


    botPlace = (e) => {
        if(!this.on) return;
        chooseSpace(getElementById(botChoose()))
    }


    updatePlayerTurn = (e) => {
        thinger.innerHTML = this.currentPlayer === this.X_TEXT ? `${this.O_TEXT}'s turn` : `${this.X_TEXT}'s turn`;
    };

    markSquareAsWon = (big) => {

        for (let i = 0; i < 81; i++) {
            let tspace = getSpaceById(i)
            console.log(big)
            console.log(tspace.bigid)
            if(tspace.bigid == big){
                tspace.player = this.currentPlayer
            }
        }
        
        thinger.innerHTML = `${this.currentPlayer} has won a square`; 
        thinger.innerHTML = this.currentPlayer === this.X_TEXT ? `${this.O_TEXT}'s turn` : `${this.X_TEXT}'s turn`;
        
    };

    highlightAvailableMoves = (id) => {
        clearAll()
        for(let i=0;i<81;i++){
            lastspace = getSpaceById(id)
            newspace = getSpaceById(i)

            if((!newspace.player) && (lastspace.smallid == newspace.bigid || this.board[lastspace.smallid].every(val => val.player !== null))){
                newspace.available=true
            }
        }

            

        
    };
    playerHasWon = () => {
        return this.winningCombos.some(([a, b, c]) => {
            return this.board[a].every((val, idx) => val.player !== null && val.player === this.board[b][idx].player && val.player === this.board[c][idx].player);
        });
    };

    playerHasWonSquare = (num) => {
        return this.winningCombos.some(([a, b, c]) => {
            return this.board[num][a].player && this.board[num][a].player === this.board[num][b].player && this.board[num][a].player === this.board[num][c].player;
        });
        
        
    };



    isFilled = (num) => {
        return this.board[num].every(val => val !== null);
    };

    chooseSpace = (e) => {

        restartBtn.innerText = 'Restart Game';
        tempid = parseInt(e.target.id);

        tempspace = getSpaceById(tempid)


        if (tempspace.available) {

            updatePlayerTurn(e);
            tempspace.player = this.currentPlayer

            if (playerHasWonSquare(tempspace.bigid)) {
                markSquareAsWon(tempspace.bigid);
                if (playerHasWon()) {
                    thinger.innerHTML = `${this.currentPlayer} has won`;
                    this.on = false;
                }
            }

            this.currentPlayer = this.currentPlayer === this.X_TEXT ? this.O_TEXT : this.X_TEXT;
            highlightAvailableMoves(tempspace.id);
        }
        update();
    }


    



    

}
game = new Game();
game.displayBoard();