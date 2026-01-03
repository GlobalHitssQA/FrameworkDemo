package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultsList;
    private Locator resultItems;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos - Locators basados en buenas prácticas para búsqueda de prospectos
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
    }

    public boolean isSearchFieldVisible() {
        try {
            return searchField.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void typeInSearchField(String text) {
        searchField.type(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areResultsDisplayed() {
        try {
            return resultsContainer.isVisible() && resultItems.count() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isResultsContainerVisible() {
        try {
            return resultsContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getResultsCount() {
        try {
            return resultItems.count();
        } catch (Exception e) {
            return 0;
        }
    }

    public boolean hasProperResultsFormatting() {
        try {
            // Verifica que el contenedor de resultados tenga las clases CSS apropiadas
            String classAttribute = resultsContainer.getAttribute("class");
            return classAttribute != null && !classAttribute.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    public void waitForResults() {
        resultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public String getResultItemText(int index) {
        return resultItems.nth(index).textContent();
    }

    public void selectResultItem(int index) {
        resultItems.nth(index).click();
    }
}