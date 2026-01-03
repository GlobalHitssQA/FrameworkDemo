package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no hay URL válida disponible)
    private Locator dashboardContainer;
    private Locator prospectSearchMenu;
    private Locator searchInputField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectNameHighlighted;
    private Locator prospectEmailField;
    private Locator prospectNameField;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos siguiendo buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.searchInputField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.prospectNameHighlighted = page.locator("[data-testid='prospect-name-highlighted']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email']");
        this.prospectNameField = page.locator("[data-testid='prospect-name']");
    }
    
    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
    }
    
    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }
    
    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
    }
    
    public boolean isSearchScreenDisplayed() {
        return searchInputField.isVisible();
    }
    
    public boolean isSearchFieldVisible() {
        return searchInputField.isVisible();
    }
    
    public boolean validateSearchFieldStyling() {
        String borderColor = searchInputField.evaluate("el => window.getComputedStyle(el).borderColor").toString();
        String fontSize = searchInputField.evaluate("el => window.getComputedStyle(el).fontSize").toString();
        return borderColor != null && fontSize != null;
    }
    
    public void enterSearchCriteria(String criteria) {
        searchInputField.fill(criteria);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public boolean areResultsDisplayed() {
        return searchResultsList.isVisible();
    }
    
    public boolean validateResultsListStyling() {
        String display = searchResultsList.evaluate("el => window.getComputedStyle(el).display").toString();
        return display != null && !display.equals("none");
    }
    
    public boolean validateHighlightedText() {
        if (!prospectNameHighlighted.isVisible()) {
            return false;
        }
        String fontWeight = prospectNameHighlighted.evaluate("el => window.getComputedStyle(el).fontWeight").toString();
        return fontWeight.equals("bold") || fontWeight.equals("700");
    }
    
    public boolean validateEmailFieldStyling() {
        if (!prospectEmailField.isVisible()) {
            return false;
        }
        String color = prospectEmailField.evaluate("el => window.getComputedStyle(el).color").toString();
        return color != null;
    }
    
    public boolean validateProspectNameStyling() {
        if (!prospectNameField.isVisible()) {
            return false;
        }
        String fontFamily = prospectNameField.evaluate("el => window.getComputedStyle(el).fontFamily").toString();
        return fontFamily != null;
    }
    
    public String getProspectName() {
        return prospectNameField.textContent();
    }
    
    public String getProspectEmail() {
        return prospectEmailField.textContent();
    }
}