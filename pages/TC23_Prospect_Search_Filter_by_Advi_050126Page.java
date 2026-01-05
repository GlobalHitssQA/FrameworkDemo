package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchMenu;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectListItems;
    private Locator prospectDetails;
    private Locator prospectCellField;
    private Locator prospectFinancialCenterField;
    private String advisorCell = "CELL_001";
    private String advisorFinancialCenter = "FC_CENTRAL";

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.prospectListItems = page.locator("[data-testid='prospect-list-item']");
        this.prospectDetails = page.locator("[data-testid='prospect-details-panel']");
        this.prospectCellField = page.locator("[data-testid='prospect-cell-assignment']");
        this.prospectFinancialCenterField = page.locator("[data-testid='prospect-financial-center']");
    }

    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
        page.waitForSelector("[data-testid='prospect-search-input']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForSelector("[data-testid='prospect-search-results']");
    }

    public int getSearchResultsCount() {
        return prospectListItems.count();
    }

    public boolean areAllProspectsInAdvisorCell() {
        int count = prospectListItems.count();
        for (int i = 0; i < count; i++) {
            Locator prospectItem = prospectListItems.nth(i);
            String cellAttribute = prospectItem.getAttribute("data-cell");
            String fcAttribute = prospectItem.getAttribute("data-financial-center");
            
            if (cellAttribute == null || 
                (!cellAttribute.equals(advisorCell) && !fcAttribute.equals(advisorFinancialCenter))) {
                return false;
            }
        }
        return true;
    }

    public boolean hasProspectsFromOtherCells() {
        int count = prospectListItems.count();
        for (int i = 0; i < count; i++) {
            Locator prospectItem = prospectListItems.nth(i);
            String cellAttribute = prospectItem.getAttribute("data-cell");
            String fcAttribute = prospectItem.getAttribute("data-financial-center");
            
            if (cellAttribute != null && 
                !cellAttribute.equals(advisorCell) && 
                !fcAttribute.equals(advisorFinancialCenter)) {
                return true;
            }
        }
        return false;
    }

    public void selectFirstProspect() {
        prospectListItems.first().click();
        page.waitForSelector("[data-testid='prospect-details-panel']");
    }

    public boolean isProspectDetailsDisplayed() {
        return prospectDetails.isVisible();
    }

    public String getProspectCellAssignment() {
        if (prospectCellField.isVisible()) {
            return prospectCellField.textContent();
        }
        return prospectFinancialCenterField.textContent();
    }

    public boolean isProspectAssignedToAdvisorCell(String prospectCell) {
        return prospectCell.equals(advisorCell) || prospectCell.equals(advisorFinancialCenter);
    }
}