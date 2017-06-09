using ClosedXML.Excel;
using System;
using System.IO;

namespace ExcelLib
{

    /// <summary>
    ///  ExcelHandler helps creating an excel report for MyConcert platform using ClosedXML library.
    /// </summary>
    class ExcelHandler
    {       
        private string DOCS_PATH = @"\home\docs\"; //Saves the document to the docs directory.

        private XLWorkbook _workbook;   //Workbook for the report.
        private IXLWorksheet _worksheet;//Worksheet for the report.
        private int _currentRow;        //Current row. (It helps adding new artists to the report. Starting at row 12.)
        private int _currentPosition;   //Current position. (It helps to add each artist a unique index. Starting at 1.)

        /// <summary>
        /// Initializes the ExcelHandler class. Asigning the _currentPosition variable to 1.
        /// </summary>
        public ExcelHandler()
        {
            _workbook = new XLWorkbook(DOCS_PATH + "file.xlsx");
            _worksheet = _workbook.Worksheet(1);
            _currentPosition = 1;
        }

        /// <summary>
        /// Adds the reports headers to the current excel file.
        /// The headers are: MyConcert, Fecha de Reporte, Usuario Sistema
        /// Top, Categorias Consideradas,Título.
        /// </summary>
        public void addReportHeader()
        {

            _worksheet.Cell("C2").Value = "My Concert";
            _worksheet.Cell("C2").Style.Font.FontSize = 24;
            _worksheet.Cell("C2").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            _worksheet.Cell("C2").Style.Alignment.SetVertical(XLAlignmentVerticalValues.Center);
            _worksheet.Range("C2:F4").Merge();

            _worksheet.Cell("A6").Value = "Fecha de Reporte:";
            _worksheet.Range("A6:B6").Row(1).Merge();
            _worksheet.Range("C6:E6").Row(1).Merge();

            _worksheet.Cell("A7").Value = "Usuario Sistema:";
            _worksheet.Range("A7:B7").Row(1).Merge();
            _worksheet.Range("C7:E7").Row(1).Merge();

            _worksheet.Cell("A8").Value = "Top #:";
            _worksheet.Range("A8:B8").Row(1).Merge();
            _worksheet.Range("C8:E8").Row(1).Merge();

            _worksheet.Cell("A9").Value = "Categorías Consideradas:";
            _worksheet.Range("A9:B9").Row(1).Merge();
            _worksheet.Range("C9:H9").Row(1).Merge();

            _worksheet.Cell("H3").Value = "Título:";
            _worksheet.Range("I3:K3").Row(1).Merge();
        }

        /// <summary>
        /// Creates the headers for the table that will hold the artists information
        /// from the report. The headers are: Posición, Nombre del Artista, Género
        /// Musical, Calificación Fanáticos MyConcert, Nota promedio Algoritmo Chef.
        /// </summary>
        /// <param name="pHeaderColor">Table header color. Must be of type XLColor from ClosedXML lib.</param>
        public void addTableHeaders(XLColor pHeaderColor)
        {

            _worksheet.Cell("A11").Value = "Posición";
            _worksheet.Cell("A11").Style.Fill.BackgroundColor = pHeaderColor;
            addAllBordersToCell("A11", XLColor.Black);

            _worksheet.Cell("B11").Value = "Nombre del Artista";
            _worksheet.Cell("B11").Style.Fill.BackgroundColor = pHeaderColor;
            _worksheet.Range("B11:E11").Row(1).Merge();
            addAllBordersToCell("B11", XLColor.Black);
            addAllBordersToCell("C11", XLColor.Black);
            addAllBordersToCell("D11", XLColor.Black);
            addAllBordersToCell("E11", XLColor.Black);

            _worksheet.Cell("F11").Value = "Género Musical";
            _worksheet.Cell("F11").Style.Fill.BackgroundColor = pHeaderColor;
            _worksheet.Range("F11:H11").Row(1).Merge();
            addAllBordersToCell("F11", XLColor.Black);
            addAllBordersToCell("G11", XLColor.Black);
            addAllBordersToCell("H11", XLColor.Black);

            _worksheet.Cell("I11").Value = "Cal. MyConcert";
            _worksheet.Cell("I11").Style.Fill.BackgroundColor = pHeaderColor;
            _worksheet.Range("I11:J11").Row(1).Merge();
            addAllBordersToCell("I11", XLColor.Black);
            addAllBordersToCell("J11", XLColor.Black);

            _worksheet.Cell("K11").Value = "Not. Alg.";
            _worksheet.Cell("K11").Style.Fill.BackgroundColor = pHeaderColor;
            addAllBordersToCell("K11", XLColor.Black);

            _currentRow = 12;
        }


        /// <summary>
        /// Adds the information to the header part of the report. The info include: 
        /// Posición, Nombre del Artista, Género Musical, Calificación Fanáticos 
        /// MyConcert, Nota promedio Algoritmo Chef.
        /// </summary>
        /// <param name="pDate">Report date.</param>
        /// <param name="pUser">System user generating the report.</param>
        /// <param name="pTop">Report top</param>
        /// <param name="pCategories">Categories included in the chef algorithm.</param>
        public void addReportInfo(string pDate, string pUser, string pTop, string pCategories)
        {
            _worksheet.Cell("C6").Value = pDate;
            _worksheet.Cell("C6").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            _worksheet.Cell("C7").Value = pUser;
            _worksheet.Cell("C7").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            _worksheet.Cell("C8").Value = pTop;
            _worksheet.Cell("C8").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            _worksheet.Cell("C9").Value = pCategories;
            _worksheet.Cell("C9").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        }

        /// <summary>
        /// Adds the title to the report. It is usually the name of the festival.
        /// </summary>
        /// <param name="pTitle">Report title.</param>
        public void addReportTitle(string pTitle)
        {
            _worksheet.Cell("I3").Value = pTitle;
            _worksheet.Cell("I3").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        }

        /// <summary>
        /// Adds a single artist to the report table. 
        /// </summary>
        /// <param name="pName">Name of the artist.</param>
        /// <param name="pGenres">Artist's genres.</param>
        /// <param name="pRating">Artist's rating generated by the user in MyConcert platform.</param>
        /// <param name="pAlgorithmScore">Artist's score generated by the chef algorithm.</param>
        public void addArtistToReport(string pName, string pGenres, string pRating, string pAlgorithmScore)
        {
            //fila - columna
            addNewArtistRow();
            _worksheet.Cell(_currentRow, 1).Value = _currentPosition;
            _worksheet.Cell(_currentRow, 2).Value = pName;
            _worksheet.Cell(_currentRow, 6).Value = pGenres;
            _worksheet.Cell(_currentRow, 9).Value = pRating;
            _worksheet.Cell(_currentRow, 11).Value = pAlgorithmScore;
            _currentRow++;
            _currentPosition++;
        }

        /// <summary>
        /// Prepares a new row in the table, by adding the corresponding styles
        /// to the whole new row.
        /// </summary>
        private void addNewArtistRow()
        {
            addAllBordersToCell(_currentRow, 1, XLColor.Black);

            _worksheet.Range(_currentRow, 2, _currentRow, 5).Row(1).Merge();
            addAllBordersToCell(_currentRow, 2, XLColor.Black);
            addAllBordersToCell(_currentRow, 3, XLColor.Black);
            addAllBordersToCell(_currentRow, 4, XLColor.Black);
            addAllBordersToCell(_currentRow, 5, XLColor.Black);

            _worksheet.Range(_currentRow, 6, _currentRow, 8).Row(1).Merge();
            addAllBordersToCell(_currentRow, 6, XLColor.Black);
            addAllBordersToCell(_currentRow, 7, XLColor.Black);
            addAllBordersToCell(_currentRow, 8, XLColor.Black);

            _worksheet.Range(_currentRow, 9, _currentRow, 10).Row(1).Merge();
            addAllBordersToCell(_currentRow, 9, XLColor.Black);
            addAllBordersToCell(_currentRow, 10, XLColor.Black);

            addAllBordersToCell(_currentRow, 11, XLColor.Black);
        }



        /// <summary>
        /// Adds a borders to a specific cell.
        /// </summary>
        /// <param name="pCell">String encoded cell, for example "B2"</param>
        /// <param name="pColor">Border color. Must be of type XLColor from ClosedXML lib.</param>
        private void addAllBordersToCell(string pCell, XLColor pColor)
        {
            _worksheet.Cell(pCell).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pCell).Style.Border.TopBorderColor = pColor;
            _worksheet.Cell(pCell).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pCell).Style.Border.BottomBorderColor = pColor;
            _worksheet.Cell(pCell).Style.Border.RightBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pCell).Style.Border.RightBorderColor = pColor;
            _worksheet.Cell(pCell).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pCell).Style.Border.LeftBorderColor = pColor;
        }

        /// <summary>
        /// Adds a borders to a specific cell.
        /// </summary>
        /// <param name="pRow">Corresponding row of the cell.</param>
        /// <param name="pColumn">Corresponding column of the cell.</param>
        /// <param name="pColor">Border color. Must be of type XLColor from ClosedXML lib.</param>
        private void addAllBordersToCell(int pRow, int pColumn, XLColor pColor)
        {
            _worksheet.Cell(pRow, pColumn).Style.Border.TopBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pRow, pColumn).Style.Border.TopBorderColor = pColor;
            _worksheet.Cell(pRow, pColumn).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pRow, pColumn).Style.Border.BottomBorderColor = pColor;
            _worksheet.Cell(pRow, pColumn).Style.Border.RightBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pRow, pColumn).Style.Border.RightBorderColor = pColor;
            _worksheet.Cell(pRow, pColumn).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
            _worksheet.Cell(pRow, pColumn).Style.Border.LeftBorderColor = pColor;
        }

        /// <summary>
        /// Saves the current document to disk. With the name report.xlsx
        /// </summary>
        public void saveDocument()
        {
            _workbook.SaveAs(DOCS_PATH + "report.xlsx");
        }

        /// <summary>
        /// Converts the current report to pdf. (CURRENTLY UNAVAILABLE)
        /// </summary>
        internal void generatePDF()
        {
            /*ExcelToPdf x = new ExcelToPdf();
            x.ConvertFile(DOCS_PATH + "report.xlsx", DOCS_PATH + "report.pdf");*/
        }

        /// <summary>
        /// Uploads the current file to MyConcert server, to allow the user to 
        /// download the file.
        /// Link: https://myconcert.fun/download/report.xlsx
        /// </summary>
        public void uploadFileToServer()
        {
            using (System.Net.WebClient client = new System.Net.WebClient())
            {
                var path = "ftp://codigo22.com/";
                var filename = DOCS_PATH + "report.xlsx";

                client.Credentials = new System.Net.NetworkCredential("files@myconcert.fun", "p@ssCE159");
                client.UploadFile(path + "/" + new FileInfo(filename).Name, "STOR", filename);
            }
        }
    }
}