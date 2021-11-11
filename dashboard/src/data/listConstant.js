const paginationOption = (page, sizePerPage, totalSize) =>  ({
  alwaysShowAllBtns: true, // Always show next and previous button
  withFirstAndLast: true, // Hide the going to First and Last page button
  hideSizePerPage: false, // Hide the sizePerPage dropdown always
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: "<<",
  prePageText: "<",
  nextPageText: ">",
  lastPageText: ">>",
  nextPageTitle: "Next page",
  prePageTitle: "Pre page",
  showTotal: true,
  page: page,
  sizePerPage: sizePerPage,
  totalSize: totalSize
});

export { paginationOption };
