import React, { Fragment } from 'react'


const Content = () =>{

    return (
        <Fragment>
            <div class="main-content">
                <div class="content-header">
                    <div class="search-bar">
                        <span>categories </span><input type="search" />
                    </div>
                    <div class="icon">
                        
                    </div>
                </div>


                <div class="content-books">
                    <h1>All Books</h1>
                    <hr />
                </div>


                <div class="book-list">
                    <table>
                        <tr>
                            <th>Book</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Total Book</th>
                            <th>Borrow</th>
                            <th>left</th>
                        </tr>
                        <tr>
                            <td>img</td>
                            <td><strong>Data Structure</strong></td>
                            <td>abc</td>
                            <td><p style="background-color: #4CBEA6;">100</p></td>
                            <td> <p style="background-color: darkmagenta;">100</p></td>
                            <td> <p style="background-color: darkorange;">100</p></td>
                        </tr>
                        <tr>
                            <td>img</td>
                            <td><strong>Algorithm</strong></td>
                            <td>abc</td>
                            <td><p style="background-color: #4CBEA6;">100</p></td>
                            <td> <p style="background-color: darkmagenta;">100</p></td>
                            <td> <p style="background-color: darkorange;">100</p></td>
                        </tr>
                        <tr>
                            <td>img</td>
                            <td><strong>Data Structure</strong></td>
                            <td>abc</td>
                            <td><p style="background-color: #4CBEA6;">100</p></td>
                            <td> <p style="background-color: darkmagenta;">100</p></td>
                            <td> <p style="background-color: darkorange;">100</p></td>
                        </tr>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Content 