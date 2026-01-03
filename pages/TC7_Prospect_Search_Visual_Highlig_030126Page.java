package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo mejores prácticas
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator coincidenceList;
    private Locator prospectNameItems;
    private Locator highlightedText;
    private Locator dashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Selectores inferidos usando data-testid y CSS semánticos
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.coincidenceList = page.locator("[data-testid='coincidence-list']");
        this.prospectNameItems = page.locator("[data-testid='prospect-name-item']");
        this.highlightedText = page.locator("[data-testid='prospect-name-item'] strong, [data-testid='prospect-name-item'] .highlight, [data-testid='prospect-name-item'] b");
        this.dashboard = page.locator("[data-testid='acticenter-dashboard']");
    }

    public void navigateToSearchScreen() {
        // Asumiendo que la URL base ya está configurada en el setup
        page.waitForLoadState();
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled() && searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
        // El sistema inicia búsqueda automáticamente al escribir 2+ caracteres
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        resultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    public boolean areResultsDisplayed() {
        return resultsList.isVisible();
    }

    public boolean isCoincidenceListVisible() {
        return coincidenceList.isVisible();
    }

    public int getCoincidenceCount() {
        return prospectNameItems.count();
    }

    public boolean areMatchingCharactersHighlighted() {
        // Verifica que existan elementos con énfasis visual (bold/highlight)
        if (highlightedText.count() == 0) {
            return false;
        }
        
        // Verifica que al menos un elemento tenga el estilo esperado
        Locator firstHighlight = highlightedText.first();
        String fontWeight = firstHighlight.evaluate("el => window.getComputedStyle(el).fontWeight").toString();
        
        // Font-weight bold es >= 700
        return fontWeight.equals("bold") || fontWeight.equals("700") || Integer.parseInt(fontWeight) >= 600;
    }

    public String getProspectNameText(int index) {
        return prospectNameItems.nth(index).textContent();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}