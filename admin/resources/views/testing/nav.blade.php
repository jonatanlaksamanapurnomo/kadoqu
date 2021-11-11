    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="{{url('/')}}">pjax Laravel 5 demo</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li id="home"><a href="{{url('/pjax')}}">Home</a></li>
              <li id="about"><a href="{{url('/pjax/about')}}" class="pjax">About</a></li>
              <li id="contact"><a href="{{url('/pjax/contact')}}" class="pjax">Contact</a></li>
              <li id="test"><a href="{{url('/pjax/test')}}" class="pjax">test</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <script>
      document.getElementById("{{$active}}").className = "active";
      </script>