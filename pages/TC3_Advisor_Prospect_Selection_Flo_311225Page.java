package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (requiere autenticación)
 */
public class ProspectSearchPage {

    private Page page;
    private static final String BASE_URL = "https://actinver.atlassian.net";

    // Locators - INFERIDOS basados en buenas prácticas y contexto del caso de prueba
    private Locator dashboardContainer;
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchResultItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator highlightedTextElements;
    private Locator recentSearchesSection;
    private Locator recentSearchItems;
    private Locator proceedButton;
    private Locator userProfileIndicator;
    private Locator errorMessage;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Dashboard locators - INFERIDOS
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.userProfileIndicator = page.locator("[data-testid='user-profile-indicator']");

        // Prospect search locators - INFERIDOS
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");

        // Search results locators - INFERIDOS
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-email']");
        this.highlightedTextElements = page.locator(".search-highlight, [data-testid='highlighted-match']");

        // Recent searches locators - INFERIDOS
        this.recentSearchesSection = page.locator("[data-testid='recent-searches-section']");
        this.recentSearchItems = page.locator("[data-testid='recent-search-item']");

        // Action buttons - INFERIDOS
        this.proceedButton = page.locator("[data-testid='proceed-with-prospect-button']");

        // Feedback elements - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner'], .loading-spinner");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isUserLoggedIn() {
        return userProfileIndicator.isVisible();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isProspectSearchAvailable() {
        return prospectSearchInput.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        prospectSearchInput.clear();
        prospectSearchInput.fill(searchTerm);
        waitForSearchResults();
    }

    private void waitForSearchResults() {
        loadingSpinner.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean areSearchResultsVisible() {
        return searchResultsContainer.isVisible();
    }

    public boolean doResultsContainNames() {
        return prospectNameElements.count() > 0;
    }

    public boolean doResultsContainEmails() {
        return prospectEmailElements.count() > 0;
    }

    public int getCoincidencesCount() {
        return searchResultItems.count();
    }

    public boolean isRecentSearchesSectionVisible() {
        return recentSearchesSection.isVisible();
    }

    public boolean areMatchingCharactersHighlighted(String searchTerm) {
        return highlightedTextElements.count() > 0;
    }

    public String getFirstProspectName() {
        if (prospectNameElements.count() > 0) {
            return prospectNameElements.first().textContent().trim();
        }
        return null;
    }

    public String getFirstProspectEmail() {
        if (prospectEmailElements.count() > 0) {
            return prospectEmailElements.first().textContent().trim();
        }
        return null;
    }

    public void selectFirstProspect() {
        if (searchResultItems.count() > 0) {
            searchResultItems.first().click();
        }
    }

    public void selectProspectByIndex(int index) {
        if (searchResultItems.count() > index) {
            searchResultItems.nth(index).click();
        }
    }

    public void clickProceedWithProspect() {
        proceedButton.click();
        page.waitForLoadState();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent().trim();
        }
        return null;
    }
}

// ============================================================
// ADDITIONAL PAGE OBJECT: ProspectDetailsPage.java
// ============================================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Details and Process Continuation
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (requiere autenticación)
 */
public class ProspectDetailsPage {

    private Page page;

    // Locators - INFERIDOS basados en buenas prácticas y contexto del caso de prueba
    private Locator pageContainer;
    private Locator prospectNameDisplay;
    private Locator prospectEmailDisplay;
    private Locator prospectDetailsSection;
    private Locator confirmContinueButton;
    private Locator pitchbookSection;
    private Locator sendPitchbookButton;
    private Locator backButton;
    private Locator loadingIndicator;
    private Locator successMessage;
    private Locator errorMessage;

    public ProspectDetailsPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Page container - INFERIDO
        this.pageContainer = page.locator("[data-testid='prospect-details-page']");

        // Prospect information display - INFERIDOS
        this.prospectNameDisplay = page.locator("[data-testid='prospect-name-display']");
        this.prospectEmailDisplay = page.locator("[data-testid='prospect-email-display']");
        this.prospectDetailsSection = page.locator("[data-testid='prospect-details-section']");

        // Action buttons - INFERIDOS
        this.confirmContinueButton = page.locator("[data-testid='confirm-continue-button']");
        this.backButton = page.locator("[data-testid='back-button']");

        // Pitchbook section - INFERIDOS
        this.pitchbookSection = page.locator("[data-testid='pitchbook-section']");
        this.sendPitchbookButton = page.locator("[data-testid='send-pitchbook-button']");

        // Feedback elements - INFERIDOS
        this.loadingIndicator = page.locator("[data-testid='loading-indicator'], .loading");
        this.successMessage = page.locator("[data-testid='success-message'], .success-message");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message");
    }

    public boolean isPageLoaded() {
        return pageContainer.isVisible();
    }

    public boolean isProspectNameDisplayed() {
        return prospectNameDisplay.isVisible();
    }

    public boolean isProspectEmailDisplayed() {
        return prospectEmailDisplay.isVisible();
    }

    public String getDisplayedProspectName() {
        if (prospectNameDisplay.isVisible()) {
            return prospectNameDisplay.textContent().trim();
        }
        return null;
    }

    public String getDisplayedProspectEmail() {
        if (prospectEmailDisplay.isVisible()) {
            return prospectEmailDisplay.textContent().trim();
        }
        return null;
    }

    public void clickConfirmContinue() {
        confirmContinueButton.click();
        waitForPageTransition();
    }

    private void waitForPageTransition() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
    }

    public boolean isPitchbookSectionVisible() {
        return pitchbookSection.isVisible();
    }

    public boolean isSendPitchbookButtonEnabled() {
        return sendPitchbookButton.isEnabled();
    }

    public void clickSendPitchbook() {
        sendPitchbookButton.click();
    }

    public void clickBack() {
        backButton.click();
        page.waitForLoadState();
    }

    public boolean isSuccessMessageVisible() {
        return successMessage.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent().trim();
        }
        return null;
    }
}