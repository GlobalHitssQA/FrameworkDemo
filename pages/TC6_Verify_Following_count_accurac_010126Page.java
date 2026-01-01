package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - basados en mejores prácticas para componentes de búsqueda de perfiles
 */
public class GitHubProfileSearchPage {

    private Page page;
    private String baseUrl;

    // Locators inferidos para el componente de búsqueda
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    
    // Locators inferidos para el dashboard de métricas
    private Locator metricsContainer;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    
    // Locators inferidos para información del perfil
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    
    // Locators inferidos para lista de seguidores
    private Locator followersList;
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = System.getProperty("app.base.url", "http://localhost:3000");
        initializeLocators();
    }

    private void initializeLocators() {
        // Input de búsqueda - locators inferidos con prioridad data-testid
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[type='text'][placeholder*='username' i], input[aria-label*='search' i]");
        
        // Botón de búsqueda con icono de lupa
        this.searchButton = page.locator("[data-testid='search-button'], #search-button, button[type='submit']:has(svg), button[aria-label*='search' i]");
        
        // Mensaje de error para usuario no encontrado
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        
        // Dashboard de métricas
        this.metricsContainer = page.locator("[data-testid='metrics-dashboard'], .metrics-dashboard, .user-metrics, .stats-container");
        this.reposMetric = page.locator("[data-testid='repos-count'], .repos-count, .metric-repos");
        this.followersMetric = page.locator("[data-testid='followers-count'], .followers-count, .metric-followers");
        this.followingMetric = page.locator("[data-testid='following-count'], .following-count, .metric-following");
        this.gistsMetric = page.locator("[data-testid='gists-count'], .gists-count, .metric-gists");
        
        // Información del perfil
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar' i]");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .user-name");
        this.userUsername = page.locator("[data-testid='user-username'], .user-username, .username");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, a[href*='blog']");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow')");
        
        // Lista de seguidores
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        
        // Indicador de límite de API
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning");
    }

    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public boolean isUsernameEntered(String expectedUsername) {
        String actualValue = searchInput.inputValue();
        return actualValue != null && actualValue.equals(expectedUsername);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileDataToLoad() {
        metricsContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isDashboardVisible() {
        return metricsContainer.isVisible();
    }

    public boolean isFollowingMetricDisplayed() {
        return followingMetric.isVisible();
    }

    public int getFollowingCount() {
        String followingText = followingMetric.innerText();
        return parseMetricValue(followingText);
    }

    public int getFollowersCount() {
        String followersText = followersMetric.innerText();
        return parseMetricValue(followersText);
    }

    public int getReposCount() {
        String reposText = reposMetric.innerText();
        return parseMetricValue(reposText);
    }

    public int getGistsCount() {
        String gistsText = gistsMetric.innerText();
        return parseMetricValue(gistsText);
    }

    private int parseMetricValue(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }
        String numericValue = text.replaceAll("[^0-9]", "");
        return numericValue.isEmpty() ? 0 : Integer.parseInt(numericValue);
    }

    public int getExpectedFollowingCountFromAPI(String username) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com/users/" + username))
                .header("Accept", "application/vnd.github.v3+json")
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                JsonObject jsonObject = JsonParser.parseString(response.body())
                    .getAsJsonObject();
                return jsonObject.get("following").getAsInt();
            }
        } catch (Exception e) {
            System.err.println("Error fetching GitHub API data: " + e.getMessage());
        }
        return -1;
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.innerText();
    }

    public boolean isUserAvatarDisplayed() {
        return userAvatar.isVisible();
    }

    public String getUserFullName() {
        return userFullName.innerText();
    }

    public String getUserUsername() {
        return userUsername.innerText();
    }

    public String getUserBio() {
        return userBio.innerText();
    }

    public String getUserLocation() {
        return userLocation.innerText();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }
}