package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator firstProspectItem;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.firstProspectItem = page.locator("[data-testid='prospect-item']").first();
    }

    public void enterSearchQuery(String query) {
        prospectSearchInput.fill(query);
        searchButton.click();
    }

    public boolean isResultsListVisible() {
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return prospectItems.count();
    }

    public String getFirstProspectInfo() {
        return firstProspectItem.textContent();
    }

    public void selectFirstProspect() {
        firstProspectItem.click();
    }

    public void selectProspectByIndex(int index) {
        prospectItems.nth(index).click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class AdvisorDashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator dashboardTitle;

    public AdvisorDashboardPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.dashboardTitle = page.locator("[data-testid='dashboard-title']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public String getDashboardTitle() {
        return dashboardTitle.textContent();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProcessSelectionPage {
    private Page page;
    private Locator processSelectionContainer;
    private Locator selectedProspectDisplay;
    private Locator processOptions;

    public ProcessSelectionPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.processSelectionContainer = page.locator("[data-testid='process-selection-container']");
        this.selectedProspectDisplay = page.locator("[data-testid='selected-prospect-info']");
        this.processOptions = page.locator("[data-testid='process-option']");
    }

    public boolean isProcessSelectionScreenVisible() {
        return processSelectionContainer.isVisible();
    }

    public String getDisplayedProspectInfo() {
        return selectedProspectDisplay.textContent();
    }

    public void selectProcessOption(int index) {
        processOptions.nth(index).click();
    }
}