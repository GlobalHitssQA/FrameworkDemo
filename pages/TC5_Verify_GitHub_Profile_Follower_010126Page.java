package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";
    private static final String GITHUB_API_URL = "https://api.github.com/users/";

    // Locators - INFERIDOS basados en mejores prácticas para un componente de búsqueda de perfiles
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator metricsSection;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator followersList;
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Input de búsqueda - inferido
        this.searchInput = page.locator("[data-testid='search-input']");
        
        // Botón de búsqueda con icono de lupa - inferido
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Mensaje de error para usuario no encontrado - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Dashboard de métricas - inferido
        this.metricsSection = page.locator("[data-testid='metrics-section']");
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        
        // Información del perfil - inferido
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        
        // Botón Follow - inferido
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Lista de seguidores - inferido
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // Indicador de límite de API - inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Métodos de navegación
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
    }

    // Métodos de interacción - Búsqueda
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        metricsSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Métodos de visibilidad
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isMetricsSectionVisible() {
        return metricsSection.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    // Métodos para obtener texto
    public String getReposCount() {
        return reposMetric.locator("[data-testid='metric-value']").textContent().trim();
    }

    public String getFollowersCount() {
        return followersMetric.locator("[data-testid='metric-value']").textContent().trim();
    }

    public String getFollowingCount() {
        return followingMetric.locator("[data-testid='metric-value']").textContent().trim();
    }

    public String getGistsCount() {
        return gistsMetric.locator("[data-testid='metric-value']").textContent().trim();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUsername() {
        return username.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public String getUserLocation() {
        return userLocation.textContent().trim();
    }

    public String getUserCompany() {
        return userCompany.textContent().trim();
    }

    // Método para obtener datos de la API de GitHub
    public String getFollowersCountFromAPI(String username) {
        APIRequestContext request = page.context().browser().newContext().request();
        APIResponse response = request.get(GITHUB_API_URL + username);
        
        if (response.ok()) {
            String responseBody = response.text();
            JsonObject jsonObject = JsonParser.parseString(responseBody).getAsJsonObject();
            return String.valueOf(jsonObject.get("followers").getAsInt());
        }
        return "0";
    }

    // Métodos de interacción adicionales
    public void clickFollowButton() {
        followButton.click();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public void clickUserWebLink() {
        userWebLink.click();
    }
}