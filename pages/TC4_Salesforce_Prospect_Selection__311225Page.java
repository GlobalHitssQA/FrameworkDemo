package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;

/**
 * Page Object for Pitchbook Prospect Search functionality
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (URL redirige a login de Atlassian)
 */
public class PitchbookProspectSearchPage {

    private final Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas y convenciones semánticas
    private final Locator prospectSearchField;
    private final Locator searchButton;
    private final Locator searchResultsContainer;
    private final Locator searchResultItems;
    private final Locator prospectNameElements;
    private final Locator prospectEmailElements;
    private final Locator selectedProspectContainer;
    private final Locator selectedProspectName;
    private final Locator selectedProspectEmail;
    private final Locator confirmationSection;
    private final Locator processFlowIndicator;
    private final Locator errorMessageContainer;
    private final Locator pitchbookSection;

    public PitchbookProspectSearchPage(Page page) {
        this.page = page;
        
        // Search field locators - INFERIDOS
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Search results locators - INFERIDOS
        this.searchResultsContainer = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-email']");
        
        // Selected prospect locators - INFERIDOS
        this.selectedProspectContainer = page.locator("[data-testid='selected-prospect-container']");
        this.selectedProspectName = page.locator("[data-testid='selected-prospect-name']");
        this.selectedProspectEmail = page.locator("[data-testid='selected-prospect-email']");
        
        // Confirmation and process flow locators - INFERIDOS
        this.confirmationSection = page.locator("[data-testid='prospect-confirmation-section']");
        this.processFlowIndicator = page.locator("[data-testid='pitchbook-process-flow']");
        this.errorMessageContainer = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        this.pitchbookSection = page.locator("[data-testid='pitchbook-section']");
    }

    // Search field interactions
    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterSearchTerm(String searchTerm) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchTerm);
        // Wait for search to be triggered (typically after typing more than 2 characters)
        page.waitForTimeout(500);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    // Search results interactions
    public boolean areSearchResultsVisible() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
        return searchResultsContainer.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean allResultsHaveProspectName() {
        int resultCount = searchResultItems.count();
        int nameCount = prospectNameElements.count();
        return resultCount > 0 && resultCount == nameCount;
    }

    public boolean allResultsHaveEmailAddress() {
        int resultCount = searchResultItems.count();
        int emailCount = prospectEmailElements.count();
        return resultCount > 0 && resultCount == emailCount;
    }

    public void selectFirstProspectWithEmail() {
        Locator firstProspectWithEmail = searchResultItems.filter(
            new Locator.FilterOptions().setHas(page.locator("[data-testid='prospect-email']"))
        ).first();
        firstProspectWithEmail.click();
    }

    public void selectProspectByIndex(int index) {
        searchResultItems.nth(index).click();
    }

    public void selectProspectByName(String name) {
        searchResultItems.filter(
            new Locator.FilterOptions().setHasText(name)
        ).first().click();
    }

    // Selected prospect information
    public String getSelectedProspectName() {
        if (selectedProspectName.isVisible()) {
            return selectedProspectName.textContent();
        }
        return null;
    }

    public String getSelectedProspectEmail() {
        if (selectedProspectEmail.isVisible()) {
            return selectedProspectEmail.textContent();
        }
        return null;
    }

    public boolean isSelectedProspectNameDisplayed() {
        return selectedProspectName.isVisible() && !selectedProspectName.textContent().isEmpty();
    }

    public boolean isSelectedProspectEmailDisplayed() {
        return selectedProspectEmail.isVisible() && !selectedProspectEmail.textContent().isEmpty();
    }

    // Confirmation section
    public boolean isConfirmationSectionVisible() {
        return confirmationSection.isVisible();
    }

    // Process flow validation
    public boolean isPitchbookProcessFlowActive() {
        return processFlowIndicator.isVisible();
    }

    public boolean hasErrorMessage() {
        return errorMessageContainer.isVisible();
    }

    public String getErrorMessage() {
        if (hasErrorMessage()) {
            return errorMessageContainer.textContent();
        }
        return null;
    }

    // Navigation
    public void navigateToPitchbookSection() {
        pitchbookSection.click();
    }

    // Utility methods
    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(15000));
    }

    public void scrollSearchResults() {
        searchResultsContainer.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}

// Additional Page Object for Dashboard
class ActicenterDashboardPage {

    private final Page page;
    
    // Locators - INFERIDOS
    private final Locator dashboardContainer;
    private final Locator pitchbookMenuLink;
    private final Locator advisorProfileIndicator;
    private final Locator usernameInput;
    private final Locator passwordInput;
    private final Locator loginButton;

    private static final String BASE_URL = "https://acticenter.actinver.com";

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        
        // Dashboard locators - INFERIDOS
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard'], #dashboard-container, .dashboard-main");
        this.pitchbookMenuLink = page.locator("[data-testid='pitchbook-menu-link'], a[href*='pitchbook'], [aria-label='Pitchbook']");
        this.advisorProfileIndicator = page.locator("[data-testid='advisor-profile'], .advisor-info, #advisor-profile");
        
        // Login locators - INFERIDOS
        this.usernameInput = page.locator("[data-testid='username-input'], #username, input[name='username']");
        this.passwordInput = page.locator("[data-testid='password-input'], #password, input[name='password']");
        this.loginButton = page.locator("[data-testid='login-button'], button[type='submit'], #login-btn");
    }

    public void navigateToActicenter() {
        page.navigate(BASE_URL);
    }

    public void loginAsAdvisor() {
        // Credentials should be provided via environment variables or test configuration
        String username = System.getenv("ADVISOR_USERNAME");
        String password = System.getenv("ADVISOR_PASSWORD");
        
        if (username != null && password != null) {
            usernameInput.fill(username);
            passwordInput.fill(password);
            loginButton.click();
            dashboardContainer.waitFor();
        }
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void navigateToPitchbookSection() {
        pitchbookMenuLink.click();
    }

    public boolean isAdvisorLoggedIn() {
        return advisorProfileIndicator.isVisible();
    }
}