package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.BoundingBox;

public class ActicenterDashboardPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator dashboardContainer;
    private Locator userRoleIndicator;

    private static final String DASHBOARD_URL = "https://actinver.atlassian.net/acticenter/dashboard";

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.userRoleIndicator = page.locator("[data-testid='user-role-indicator']");
    }

    public void navigateToDashboard() {
        page.navigate(DASHBOARD_URL);
    }

    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor();
    }

    public boolean isProspectSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isProspectSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterTextInProspectSearchField(String text) {
        prospectSearchField.fill(text);
    }

    public String getProspectSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public void clearProspectSearchField() {
        prospectSearchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isProspectSearchFieldInViewport() {
        BoundingBox box = prospectSearchField.boundingBox();
        if (box == null) return false;
        
        double viewportHeight = page.viewportSize().height;
        double viewportWidth = page.viewportSize().width;
        
        return box.y >= 0 && box.y < viewportHeight && 
               box.x >= 0 && box.x < viewportWidth;
    }

    public boolean isProspectSearchFieldPositionedCorrectly() {
        BoundingBox searchBox = prospectSearchField.boundingBox();
        BoundingBox dashboardBox = dashboardContainer.boundingBox();
        
        if (searchBox == null || dashboardBox == null) return false;
        
        // Verificar que el campo de búsqueda esté dentro del contenedor del dashboard
        return searchBox.x >= dashboardBox.x && 
               searchBox.y >= dashboardBox.y && 
               (searchBox.x + searchBox.width) <= (dashboardBox.x + dashboardBox.width) && 
               (searchBox.y + searchBox.height) <= (dashboardBox.y + dashboardBox.height);
    }

    public String getUserRole() {
        return userRoleIndicator.textContent();
    }
}