// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //this = instance of board
      var board = this.attributes;
      var row = board[rowIndex];
      var count = 0;
      for (var i = 0; i  < row.length; i++) {
        if (board[rowIndex][i] === 1) {
          count++
        };
      }
      if (count > 1) {
        return true; // fixme
      } else {
        return false;
      }
    },
    hasAnyRowConflicts: function() {
      var board = this.attributes;
      var length = board.n;
      for (var i = 0; i < length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },
    // test if any rows on this board contain conflicts



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.attributes;
      var length = board.n;
      var count = 0;
      for (var i = 0; i < length; i++) {
        if (board[i][colIndex]) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.attributes;
      var length = board.n;
      var truthy = false;
      for (var i = 0; i < length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return truthy; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // majorDiagonalColumnIndexAtFirstRow
    hasMajorDiagonalConflictAt: function(diag) {
      var board = this.attributes;
      // rows of board
      var length = this.attributes.n;
      var count = 0;
      for (var i = 0; i < length; i++) {
          if (board[i][diag] === 1) {
            count++;
          }
        diag++;
      }
      if (count > 1) {
        return true;
      }
      return false;
    },
    // hasMajorDiagonalConflictAt: function(diag) {
    //   var board = this.attributes;
    //   // rows of board
    //   var length = this.attributes.n;
    //   var count = 0;
    //   for (var i = 0; i < length; i++) {
    //     if (diag = 0) {
    //       if (board[i][i] === 1) {
    //         console.log('board i i');
    //         count++;
    //       }
    //     } else if (diag > 0){
    //       if (board[i][i + diag] === 1) {
    //         console.log('board diag i');
    //         count++;
    //       }
    //       if (board[i + diag][i] === 1) {
    //         console.log('board i diag');
    //         count++;
    //       }
    //     }
    //   }
    //   if (count > 1) {
    //     return true;
    //   }
    //   return false;
    // },

    // test if any major diagonals on this board contain conflicts
    // hasAnyMajorDiagonalConflicts: function() {
    //   var board = this.attributes;
    //   var length = board.n;
    //   var checkDiag = function(initRow, initColumn) {
    //     var count = 0;
    //     for (var i = initRow; i < length; i++) {
    //       if (board[i][initColumn] === 1) {
    //         count++;
    //       }
    //       initColumn++
    //     }
    //     return (count > 1) ? true : false;
    //   }
    //   for (var i = 0; i < length; i++) {
    //     for (var j = 0; j < length; j++) {
    //       if (checkDiag(j, i)) return true;
    //     }
    //   }
    //   return false;
    // },
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.attributes;
      var length = board.n;
      for (var i = -length + 1; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;// fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    //minorDiagonalColumnIndexAtFirstRow
    hasMinorDiagonalConflictAt: function(diag) {
      var board = this.attributes;
      var length = board.n;
      var count = 0;
      for (var i = 0; i < length; i++) {
        if(board[i][diag] === 1) {
          count++;
        }
        diag--;
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts

    // hasAnyMinorDiagonalConflicts: function() {
    //   var board = this.attributes;
    //   var length = board.n;
    //   var checkDiag = function(initRow, initColumn) {
    //     var count = 0;
    //     for (var i = initRow; i < length; i++) {
    //       if (board[i][initColumn] === 1) {
    //         count++;
    //       }
    //       initColumn--;
    //     }
    //     return (count > 1) ? true : false;
    //   }
    //   for (var i = length; i >= 0; i--) {
    //     for (var j = 0; j < length; j++) {
    //       if (checkDiag(j, i)) return true;
    //     }
    //   }
    //   return false; // fixme
    // }

    hasAnyMinorDiagonalConflicts: function() {
      var board = this.attributes;
      var length = board.n;
      for (var i = 0; i < 2 * length - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
