package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator newProspectButton;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator functionsMenu;

    public DashboardPage(Page page) {
        this.page = page;
        // Inferidos - Locators basados en buenas prácticas y contexto del proyecto
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.newProspectButton = page.locator("[data-testid='create-new-prospect-button']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.functionsMenu = page.locator("[data-testid='dashboard-functions-menu']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean areFunctionsLoaded() {
        return functionsMenu.isVisible() && functionsMenu.count() > 0;
    }

    public boolean isNewProspectCreationVisible() {
        return newProspectButton.isVisible();
    }

    public boolean isNewProspectCreationEnabled() {
        return newProspectButton.isEnabled();
    }

    public void clickNewProspectCreation() {
        newProspectButton.click();
    }

    public void searchProspect(String searchTerm) {
        prospectSearchField.fill(searchTerm);
        searchButton.click();
    }
}

// Archivo adicional: ProspectCreationPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectCreationPage {
    private Page page;
    private Locator prospectCreationScreen;
    private Locator prospectForm;
    private Locator nameField;
    private Locator emailField;
    private Locator submitButton;
    private Locator errorMessage;

    public ProspectCreationPage(Page page) {
        this.page = page;
        // Inferidos - Locators basados en buenas prácticas
        this.prospectCreationScreen = page.locator("[data-testid='prospect-creation-screen']");
        this.prospectForm = page.locator("[data-testid='prospect-form']");
        this.nameField = page.locator("[data-testid='prospect-name-input']");
        this.emailField = page.locator("[data-testid='prospect-email-input']");
        this.submitButton = page.locator("[data-testid='submit-prospect-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public boolean isProspectCreationScreenDisplayed() {
        return prospectCreationScreen.isVisible();
    }

    public boolean isProspectFormVisible() {
        return prospectForm.isVisible();
    }

    public void fillProspectName(String name) {
        nameField.fill(name);
    }

    public void fillProspectEmail(String email) {
        emailField.fill(email);
    }

    public void submitProspect() {
        submitButton.click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
}